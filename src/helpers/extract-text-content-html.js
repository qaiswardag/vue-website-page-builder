const extractAllTextContent = (html, maxLength) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Extract content from all elements and insert space after each dot
    const allElements = doc.body.querySelectorAll("*");
    const contentArray = Array.from(allElements).map((element) =>
        element.textContent.trim().replace(/\./g, ". ")
    );

    // Join the extracted content into a single string
    let content = contentArray.join(" ");
    content = content.replace(/\s+/g, " ");

    // Limit the content to the first maxLength characters
    content = content.slice(0, maxLength);

    return content;
};

export const extractTextContentHTML = function extractTextContentHTML(
    html,
    maxLength
) {
    if (html) {
        // Extract all text content
        const extractedContent = extractAllTextContent(html, maxLength);

        return extractedContent
            ? extractedContent
            : `Fashion & Jobs | ${props.postType}`;
    } else {
        return `Fashion & Jobs | ${props.postType}`;
    }
};
