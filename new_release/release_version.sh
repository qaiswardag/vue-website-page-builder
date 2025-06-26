#!/bin/bash

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Ensure required tools are installed
if ! command_exists git; then
  echo "Error: git is not installed."
  exit 1
fi

if ! command_exists gh; then
  echo "Error: GitHub CLI (gh) is not installed."
  exit 1
fi

# Read the version number from package.json
VERSION=$(jq -r '.version' ./package.json)
if [ -z "$VERSION" ]; then
    echo "Error: version number in package.json is empty."
    exit 1
fi

# Check if the release notes file exists and is not empty
if [ ! -s ./new_release/RELEASE_NOTES.md ]; then
  echo "Error: RELEASE_NOTES.md file is missing or empty."
  exit 1
fi

# Get the latest tag
LATEST_TAG=$(git describe --tags --abbrev=0)

# Create a temporary file for the release notes
TEMP_RELEASE_NOTES=$(mktemp)

# Copy the existing release notes to the temporary file
cat ./new_release/RELEASE_NOTES.md > "$TEMP_RELEASE_NOTES"

# Append the latest commits since the last tag to the temporary release notes file
echo "\n\n## Latest Commits\n" >> "$TEMP_RELEASE_NOTES"
git log "$LATEST_TAG"..HEAD --pretty=format:"- %s (%h)" >> "$TEMP_RELEASE_NOTES"

# Create a new tag with the desired version number
git tag "v$VERSION"
if [ $? -ne 0 ]; then
  echo "Error: Failed to create git tag."
  exit 1
fi

# Push the tag to GitHub
git push origin "v$VERSION"
if [ $? -ne 0 ]; then
  echo "Error: Failed to push git tag to GitHub."
  exit 1
fi

# Create a GitHub release with release notes
gh release create "v$VERSION" --title "v$VERSION" --notes-file "$TEMP_RELEASE_NOTES"
if [ $? -eq 0 ]; then
  echo "Release version $VERSION created successfully."
else
  echo "Error: Failed to create GitHub release."
  exit 1
fi

# Remove the temporary release notes file
rm "$TEMP_RELEASE_NOTES"

# Build the library for production
echo "\n\nBuilding the library..."
npm run build:lib
if [ $? -ne 0 ]; then
  echo "Error: Failed to build the library."
  exit 1
fi

# Publish to npm
echo "\n\nPublishing to npm..."
npm publish
if [ $? -eq 0 ]; then
  echo "Package version $VERSION published to npm successfully."
else
  echo "Error: Failed to publish to npm."
  exit 1
fi

# Check the current tag
echo "\n\nChecking the current tag:"
git describe --tags