interface ComponentData {
  title: string
  html_code: string
  cover_image: string | null
  category: string
}

interface Components {
  components: {
    data: ComponentData[]
  }
}

// Generate placeholder image data URL from Single Image SVG
const getPlaceholderImageDataUrl = (): string => {
  const singleImageSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150">
      <defs>
        <style>
          .bg { fill: #384152; }
          .fg { fill: #718096; }
        </style>
      </defs>
      <rect class="bg" width="200" height="150"/>
      <polygon class="fg" points="65 90.01 90 60.01 115 90.01"/>
      <polygon class="fg" points="110 90.01 122.5 75.01 135 90.01"/>
      <circle class="fg" cx="122.5" cy="64.15" r="4.16"/>
    </svg>
  `

  // Convert SVG to data URL
  const encodedSvg = encodeURIComponent(singleImageSvg.trim())
  return `data:image/svg+xml,${encodedSvg}`
}

const component: Components[] = [
  {
    components: {
      data: [
        {
          title: 'Single Image',
          html_code: `<section>\n<div class="md:pt-12 md:pb-12 pt-4 pb-4 lg:px-4 px-2"><div class="mx-auto max-w-7xl"><div class="myPrimaryGap grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1"> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${getPlaceholderImageDataUrl()}" alt="provider"></div></div></div></div>\n</section>`,
          category: 'Images',
          cover_image: `
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150">
                        <defs>
                          <style>
                            .bg { fill: #384152; }
                            .fg { fill: #718096; }
                          </style>
                        </defs>
                        <rect class="bg" width="200" height="150"/>
                        <polygon class="fg" points="65 90.01 90 60.01 115 90.01"/>
                        <polygon class="fg" points="110 90.01 122.5 75.01 135 90.01"/>
                        <circle class="fg" cx="122.5" cy="64.15" r="4.16"/>
                      </svg>
        `,
        },
        {
          title: 'Two Vertical Images',
          html_code: `<section>\n<div class="md:pt-12 md:pb-12 pt-4 pb-4 lg:px-4 px-2"><div class="mx-auto max-w-7xl"><div class="myPrimaryGap grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2"> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-[9/16] " src="${getPlaceholderImageDataUrl()}" alt="provider">  </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-[9/16] " src="${getPlaceholderImageDataUrl()}" alt="provider">  </div>   </div> </div> </div>\n</section>`,
          category: 'Images',
          cover_image: `
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 133.88 122.11">
                        <defs>
                          <style>
                            .cls-1 {
                              fill: #384152;
                            }

                            .cls-2 {
                              fill: #718096;
                            }
                          </style>
                        </defs>
                        <g>
                          <rect class="cls-1" width="63.93" height="122.11"/>
                          <g>
                            <polygon class="cls-2" points="8.68 71.04 25.31 51.08 41.94 71.04 8.68 71.04"/>
                            <polygon class="cls-2" points="38.62 71.04 46.93 61.06 55.24 71.04 38.62 71.04"/>
                            <circle class="cls-2" cx="46.93" cy="53.84" r="2.77"/>
                          </g>
                        </g>
                        <g>
                          <rect class="cls-1" x="69.95" width="63.93" height="122.11"/>
                          <g>
                            <polygon class="cls-2" points="78.64 71.04 95.27 51.08 111.89 71.04 78.64 71.04"/>
                            <polygon class="cls-2" points="108.57 71.04 116.88 61.06 125.2 71.04 108.57 71.04"/>
                            <circle class="cls-2" cx="116.88" cy="53.84" r="2.77"/>
                          </g>
                        </g>
                      </svg>
                    `,
        },
        {
          title: 'Two Square Images',
          html_code: `<section>\n<div class="md:pt-12 md:pb-12 pt-4 pb-4 lg:px-4 px-2"><div class="mx-auto max-w-7xl"><div class="myPrimaryGap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${getPlaceholderImageDataUrl()}" alt="provider">  </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${getPlaceholderImageDataUrl()}" alt="provider"></div></div> </div></div>\n</section>`,
          category: 'Images',
          cover_image: `
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120.18 57.68">
                        <defs>
                          <style>
                            .cls-1 {
                              fill: #384152;
                            }

                            .cls-2 {
                              fill: #718096;
                            }
                          </style>
                        </defs>
                        <g>
                          <rect class="cls-1" width="57.68" height="57.68"/>
                          <g>
                            <polygon class="cls-2" points="8.77 37.45 23.11 20.25 37.44 37.45 8.77 37.45"/>
                            <polygon class="cls-2" points="34.58 37.45 41.74 28.85 48.91 37.45 34.58 37.45"/>
                            <circle class="cls-2" cx="41.74" cy="22.62" r="2.39"/>
                          </g>
                        </g>
                        <g>
                          <rect class="cls-1" x="62.5" width="57.68" height="57.68"/>
                          <g>
                            <polygon class="cls-2" points="71.27 37.45 85.61 20.25 99.94 37.45 71.27 37.45"/>
                            <polygon class="cls-2" points="97.07 37.45 104.24 28.85 111.41 37.45 97.07 37.45"/>
                            <circle class="cls-2" cx="104.24" cy="22.62" r="2.39"/>
                          </g>
                        </g>
                      </svg>
                    `,
        },
        {
          title: 'Three Square Images',
          html_code: `<section>\n<div class="md:pt-12 md:pb-12 pt-4 pb-4 lg:px-4 px-2"><div class="mx-auto max-w-7xl"><div class="myPrimaryGap grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3"> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${getPlaceholderImageDataUrl()}" alt="provider">  </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${getPlaceholderImageDataUrl()}" alt="provider">  </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${getPlaceholderImageDataUrl()}" alt="provider"></div></div> </div></div>\n</section>`,
          category: 'Images',
          cover_image: `
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 177.28 53.92">
                        <defs>
                          <style>
                            .bg { fill: #384152; }
                            .fg { fill: #718096; }
                          </style>
                        </defs>
                        <rect class="bg" width="53.92" height="53.92"/>
                        <rect class="bg" x="62.15" width="53.92" height="53.92"/>
                        <rect class="bg" x="123.37" width="53.92" height="53.92"/>
                        <polygon class="fg" points="8.2 35 21.6 18.92 35 35"/>
                        <polygon class="fg" points="32.32 35 39.02 26.96 45.71 35"/>
                        <circle class="fg" cx="39.02" cy="21.15" r="2.23"/>
                        <polygon class="fg" points="70.36 35 83.75 18.92 97.15 35"/>
                        <polygon class="fg" points="94.47 35 101.17 26.96 107.87 35"/>
                        <circle class="fg" cx="101.17" cy="21.15" r="2.23"/>
                        <polygon class="fg" points="131.57 35 144.96 18.92 158.36 35"/>
                        <polygon class="fg" points="155.68 35 162.38 26.96 169.08 35"/>
                        <circle class="fg" cx="162.38" cy="21.15" r="2.23"/>
                      </svg>
                    `,
        },
        {
          title: 'Four Square Images',
          html_code: `<section>\n<div class="md:pt-12 md:pb-12 pt-4 pb-4 lg:px-4 px-2"> <div class="mx-auto max-w-7xl"> <div class="myPrimaryGap grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4"> <div><img class="object-cover w-full object-top aspect-square " src="${getPlaceholderImageDataUrl()}" alt="provider"></div> <div><img class="object-cover w-full object-top aspect-square " src="${getPlaceholderImageDataUrl()}" alt="provider"></div> <div><img class="object-cover w-full object-top aspect-square " src="${getPlaceholderImageDataUrl()}" alt="provider"></div> <div><img class="object-cover w-full object-top aspect-square " src="${getPlaceholderImageDataUrl()}" alt="provider"></div> </div> </div> </div>\n</section>`,
          category: 'Images',
          cover_image: `
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190.34 42.55">
                        <defs>
                          <style>
                            .cls-1 {
                              fill: #394152;
                            }

                            .cls-2 {
                              fill: #718096;
                            }
                          </style>
                        </defs>
                        <rect class="cls-1" width="42.55" height="42.55"/>
                        <rect class="cls-1" x="49.05" width="42.55" height="42.55"/>
                        <rect class="cls-1" x="97.35" width="42.55" height="42.55"/>
                        <rect class="cls-1" x="147.79" width="42.55" height="42.55"/>
                        <polygon class="cls-2" points="6.47 27.62 17.04 14.93 27.62 27.62 6.47 27.62"/>
                        <polygon class="cls-2" points="25.5 27.62 30.79 21.28 36.07 27.62 25.5 27.62"/>
                        <circle class="cls-2" cx="30.79" cy="16.69" r="1.76"/>
                        <polygon class="cls-2" points="55.52 27.62 66.09 14.93 76.66 27.62 55.52 27.62"/>
                        <polygon class="cls-2" points="74.55 27.62 79.83 21.28 85.12 27.62 74.55 27.62"/>
                        <circle class="cls-2" cx="79.83" cy="16.69" r="1.76"/>
                        <polygon class="cls-2" points="103.82 27.62 114.39 14.93 124.97 27.62 103.82 27.62"/>
                        <polygon class="cls-2" points="122.85 27.62 128.14 21.28 133.42 27.62 122.85 27.62"/>
                        <circle class="cls-2" cx="128.14" cy="16.69" r="1.76"/>
                        <polygon class="cls-2" points="154.26 27.62 164.83 14.93 175.4 27.62 154.26 27.62"/>
                        <polygon class="cls-2" points="173.29 27.62 178.57 21.28 183.86 27.62 173.29 27.62"/>
                        <circle class="cls-2" cx="178.57" cy="16.69" r="1.76"/>
                      </svg>
                    `,
        },
        {
          title: 'Six Square Images Grid',
          html_code: `<section>\n<div class="md:pt-12 md:pb-12 pt-4 pb-4 lg:px-4 px-2">\n<div class="mx-auto max-w-7xl">\n<div class="grid grid-cols-2 md:grid-cols-3 myPrimaryGap">\n\n<div>\n<img class="object-cover w-full object-top aspect-square " src="${getPlaceholderImageDataUrl()}" alt="image">\n</div>\n\n<div>\n<img class="object-cover w-full object-top aspect-square " src="${getPlaceholderImageDataUrl()}" alt="image">\n</div>\n\n<div>\n<img class="object-cover w-full object-top aspect-square " src="${getPlaceholderImageDataUrl()}" alt="image">\n</div>\n\n<div>\n<img class="object-cover w-full object-top aspect-square " src="${getPlaceholderImageDataUrl()}" alt="image">\n</div>\n\n<div>\n<img class="object-cover w-full object-top aspect-square " src="${getPlaceholderImageDataUrl()}" alt="image">\n</div>\n\n<div>\n<img class="object-cover w-full object-top aspect-square " src="${getPlaceholderImageDataUrl()}" alt="image">\n</div>\n\n</div>\n</div>\n</div>\n</section>`,
          category: 'Images',
          cover_image: `
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 177.28 120.27">
                        <defs>
                          <style>
                            .bg { fill: #384152; }
                            .fg { fill: #718096; }
                          </style>
                        </defs>
                        <rect class="bg" width="53.92" height="53.92"/>
                        <rect class="bg" x="62.15" width="53.92" height="53.92"/>
                        <rect class="bg" x="123.37" width="53.92" height="53.92"/>
                        <rect class="bg" y="66.35" width="53.92" height="53.92"/>
                        <rect class="bg" x="62.15" y="66.35" width="53.92" height="53.92"/>
                        <rect class="bg" x="123.37" y="66.35" width="53.92" height="53.92"/>
                        <polygon class="fg" points="8.2 35 21.6 18.92 35 35"/>
                        <polygon class="fg" points="32.32 35 39.02 26.96 45.71 35"/>
                        <circle class="fg" cx="39.02" cy="21.15" r="2.23"/>
                        <polygon class="fg" points="70.36 35 83.75 18.92 97.15 35"/>
                        <polygon class="fg" points="94.47 35 101.17 26.96 107.87 35"/>
                        <circle class="fg" cx="101.17" cy="21.15" r="2.23"/>
                        <polygon class="fg" points="131.57 35 144.96 18.92 158.36 35"/>
                        <polygon class="fg" points="155.68 35 162.38 26.96 169.08 35"/>
                        <circle class="fg" cx="162.38" cy="21.15" r="2.23"/>
                        <polygon class="fg" points="8.2 101.35 21.6 85.28 35 101.35"/>
                        <polygon class="fg" points="32.32 101.35 39.02 93.32 45.71 101.35"/>
                        <circle class="fg" cx="39.02" cy="87.5" r="2.23"/>
                        <polygon class="fg" points="70.36 101.35 83.75 85.28 97.15 101.35"/>
                        <polygon class="fg" points="94.47 101.35 101.17 93.32 107.87 101.35"/>
                        <circle class="fg" cx="101.17" cy="87.5" r="2.23"/>
                        <polygon class="fg" points="131.57 101.35 144.96 85.28 158.36 101.35"/>
                        <polygon class="fg" points="155.68 101.35 162.38 93.32 169.08 101.35"/>
                        <circle class="fg" cx="162.38" cy="87.5" r="2.23"/>
                      </svg>
                    `,
        },
        {
          title: 'Two Square Images With Text',
          html_code: `<section>\n<div class="md:pt-12 md:pb-12 pt-4 pb-4 lg:px-4 px-2"><div class="mx-auto max-w-7xl">\n<div class="myPrimaryGap lg:flex lg:justify-center"><div class="flex-1 py-2">\n<div class="grid myPrimaryGap grid-cols-1 lg:grid-cols-2"> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${getPlaceholderImageDataUrl()}" alt="provider">  </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${getPlaceholderImageDataUrl()}" alt="provider">  </div>   </div> </div>\n\n<div class="flex-1 py-2"> <div class="break-words py-2"><p>Start customizing by editing this default text directly in the editor.</p></div></div> \n</div></div></div>\n</section>`,
          category: 'Images & Text',
          cover_image: `
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 179.99 53.92">
                        <defs>
                          <style>
                            .bg { fill: #384152; }
                            .fg { fill: #718096; }
                          </style>
                        </defs>
                        <rect class="bg" width="53.92" height="53.92"/>
                        <rect class="bg" x="62.15" width="53.92" height="53.92"/>
                        <polygon class="fg" points="8.2 35 21.6 18.92 35 35"/>
                        <polygon class="fg" points="32.32 35 39.02 26.96 45.71 35"/>
                        <circle class="fg" cx="39.02" cy="21.15" r="2.23"/>
                        <polygon class="fg" points="70.36 35 83.75 18.92 97.15 35"/>
                        <polygon class="fg" points="94.47 35 101.17 26.96 107.87 35"/>
                        <circle class="fg" cx="101.17" cy="21.15" r="2.23"/>
                        <rect class="bg" x="126.07" width="53.92" height="2.93"/>
                        <rect class="bg" x="126.07" y="4" width="53.92" height="2.93"/>
                        <rect class="bg" x="126.07" y="7.99" width="53.92" height="2.93"/>
                        <rect class="bg" x="126.07" y="11.99" width="53.92" height="2.93"/>
                        <rect class="bg" x="126.07" y="15.99" width="53.92" height="2.93"/>
                      </svg>
                    `,
        },
        {
          title: 'Three Vertical Images',
          html_code: `<section>\n<div class="md:pt-12 md:pb-12 pt-4 pb-4 lg:px-4 px-2"><div class="mx-auto max-w-7xl"><div class="myPrimaryGap grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3"> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-[9/16] " src="${getPlaceholderImageDataUrl()}" alt="provider">  </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-[9/16] " src="${getPlaceholderImageDataUrl()}" alt="provider">  </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-[9/16] " src="${getPlaceholderImageDataUrl()}" alt="provider"></div></div> </div></div>\n</section>`,
          category: 'Images',
          cover_image: `
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 179.84 110.72">
                        <defs>
                          <style>
                            .bg { fill: #384152; }
                            .fg { fill: #718096; }
                          </style>
                        </defs>
                        <rect class="bg" width="54.28" height="110.72"/>
                        <rect class="bg" x="62.79" width="54.28" height="110.72"/>
                        <rect class="bg" x="125.56" width="54.28" height="110.72"/>
                        <polygon class="fg" points="7.37 63.83 21.49 46.89 35.61 63.83"/>
                        <polygon class="fg" points="32.79 63.83 39.85 55.36 46.91 63.83"/>
                        <circle class="fg" cx="39.85" cy="49.23" r="2.35"/>
                        <polygon class="fg" points="70.17 63.83 84.29 46.89 98.4 63.83"/>
                        <polygon class="fg" points="95.58 63.83 102.64 55.36 109.7 63.83"/>
                        <circle class="fg" cx="102.64" cy="49.23" r="2.35"/>
                        <polygon class="fg" points="132.94 63.83 147.06 46.89 161.18 63.83"/>
                        <polygon class="fg" points="158.35 63.83 165.41 55.36 172.47 63.83"/>
                        <circle class="fg" cx="165.41" cy="49.23" r="2.35"/>
                      </svg>
                    `,
        },
        {
          title: 'Four Square Images With Text',
          html_code: `<section>\n<div class="md:pt-12 md:pb-12 pt-4 pb-4 lg:px-4 px-2"><div class="mx-auto max-w-7xl"><div class="myPrimaryGap grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4"> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${getPlaceholderImageDataUrl()}" alt="provider"> <div class="break-words py-2"><p>Layouts and visual.</p><p>Start customizing by editing this default text directly in the editor.</p></div> </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${getPlaceholderImageDataUrl()}" alt="provider"> <div class="break-words py-2"><p>Layouts and visual.</p><p>Start customizing by editing this default text directly in the editor.</p></div> </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${getPlaceholderImageDataUrl()}" alt="provider"> <div class="break-words py-2"><p>Layouts and visual.</p><p>Start customizing by editing this default text directly in the editor.</p></div> </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${getPlaceholderImageDataUrl()}" alt="provider"><div class="break-words py-2"><p>Layouts and visual.</p><p>Start customizing by editing this default text directly in the editor.</p></div> </div> </div> </div> </div>\n</section>`,
          category: 'Images & Text',
          cover_image: `
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190.33 55.9">
                        <defs>
                          <style>
                            .bg { fill: #384152; }
                            .fg { fill: #718096; }
                          </style>
                        </defs>
                        <rect class="bg" width="42.55" height="42.55"/>
                        <rect class="bg" x="49.05" width="42.55" height="42.55"/>
                        <rect class="bg" x="97.35" width="42.55" height="42.55"/>
                        <rect class="bg" x="147.79" width="42.55" height="42.55"/>
                        <polygon class="fg" points="6.47 27.62 17.04 14.93 27.62 27.62"/>
                        <polygon class="fg" points="25.5 27.62 30.79 21.28 36.07 27.62"/>
                        <circle class="fg" cx="30.79" cy="16.69" r="1.76"/>
                        <polygon class="fg" points="55.52 27.62 66.09 14.93 76.66 27.62"/>
                        <polygon class="fg" points="74.55 27.62 79.83 21.28 85.12 27.62"/>
                        <circle class="fg" cx="79.83" cy="16.69" r="1.76"/>
                        <polygon class="fg" points="103.82 27.62 114.39 14.93 124.97 27.62"/>
                        <polygon class="fg" points="122.85 27.62 128.14 21.28 133.42 27.62"/>
                        <circle class="fg" cx="128.14" cy="16.69" r="1.76"/>
                        <polygon class="fg" points="154.26 27.62 164.83 14.93 175.4 27.62"/>
                        <polygon class="fg" points="173.29 27.62 178.57 21.28 183.86 27.62"/>
                        <circle class="fg" cx="178.57" cy="16.69" r="1.76"/>
                        <rect class="bg" y="47.28" width="42.55" height="2.31"/>
                        <rect class="bg" y="50.43" width="42.55" height="2.31"/>
                        <rect class="bg" y="53.59" width="42.55" height="2.31"/>
                        <rect class="bg" x="49.05" y="47.28" width="42.55" height="2.31"/>
                        <rect class="bg" x="49.05" y="50.43" width="42.55" height="2.31"/>
                        <rect class="bg" x="49.05" y="53.59" width="42.55" height="2.31"/>
                        <rect class="bg" x="97.35" y="47.28" width="42.55" height="2.31"/>
                        <rect class="bg" x="97.35" y="50.43" width="42.55" height="2.31"/>
                        <rect class="bg" x="97.35" y="53.59" width="42.55" height="2.31"/>
                        <rect class="bg" x="147.79" y="47.28" width="42.55" height="2.31"/>
                        <rect class="bg" x="147.79" y="50.43" width="42.55" height="2.31"/>
                        <rect class="bg" x="147.79" y="53.59" width="42.55" height="2.31"/>
                      </svg>
                    `,
        },
        {
          title: 'Three Square Images With Text',
          html_code: `<section>\n<div class="md:pt-12 md:pb-12 pt-4 pb-4 lg:px-4 px-2"><div class="mx-auto max-w-7xl"><div class="myPrimaryGap grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3"> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${getPlaceholderImageDataUrl()}" alt="provider"> <div class="break-words py-2"><p>Layouts and visual.</p><p>Start customizing by editing this default text directly in the editor.</p></div> </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${getPlaceholderImageDataUrl()}" alt="provider"> <div class="break-words py-2"><p>Layouts and visual.</p><p>Start customizing by editing this default text directly in the editor.</p></div> </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${getPlaceholderImageDataUrl()}" alt="provider"> <div class="break-words py-2"><p>Layouts and visual.</p><p>Start customizing by editing this default text directly in the editor.</p></div> </div>  </div> </div> </div>\n</section>`,
          category: 'Images & Text',
          cover_image: `
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 177.28 70.84">
                        <defs>
                          <style>
                            .bg { fill: #384152; }
                            .fg { fill: #718096; }
                          </style>
                        </defs>
                        <rect class="bg" width="53.92" height="53.92"/>
                        <rect class="bg" x="62.15" width="53.92" height="53.92"/>
                        <rect class="bg" x="123.37" width="53.92" height="53.92"/>
                        <polygon class="fg" points="8.2 35 21.6 18.92 35 35"/>
                        <polygon class="fg" points="32.32 35 39.02 26.96 45.71 35"/>
                        <circle class="fg" cx="39.02" cy="21.15" r="2.23"/>
                        <polygon class="fg" points="70.36 35 83.75 18.92 97.15 35"/>
                        <polygon class="fg" points="94.47 35 101.17 26.96 107.87 35"/>
                        <circle class="fg" cx="101.17" cy="21.15" r="2.23"/>
                        <polygon class="fg" points="131.57 35 144.96 18.92 158.36 35"/>
                        <polygon class="fg" points="155.68 35 162.38 26.96 169.08 35"/>
                        <circle class="fg" cx="162.38" cy="21.15" r="2.23"/>
                        <rect class="bg" y="59.92" width="53.92" height="2.93"/>
                        <rect class="bg" y="63.91" width="53.92" height="2.93"/>
                        <rect class="bg" y="67.91" width="53.92" height="2.93"/>
                        <rect class="bg" x="62.15" y="59.92" width="53.92" height="2.93"/>
                        <rect class="bg" x="62.15" y="63.91" width="53.92" height="2.93"/>
                        <rect class="bg" x="62.15" y="67.91" width="53.92" height="2.93"/>
                        <rect class="bg" x="123.37" y="59.92" width="53.92" height="2.93"/>
                        <rect class="bg" x="123.37" y="63.91" width="53.92" height="2.93"/>
                        <rect class="bg" x="123.37" y="67.91" width="53.92" height="2.93"/>
                      </svg>
                    `,
        },
        {
          title: 'Show Single Product',
          html_code: `<section data-component-title="Header H2"><div class="pbx-relative pbx-py-4"><div class="pbx-mx-auto pbx-max-w-7xl lg:pbx-px-4 pbx-px-2"><div class="pbx-break-words pbx-font-medium pbx-text-3xl lg:pbx-text-6xl"><h2>Inceptos himenaeos</h2></div></div></div></section> <section data-component-title="Text"> <div class="pbx-relative pbx-py-4"> <div class="pbx-mx-auto pbx-max-w-7xl lg:pbx-px-4 pbx-px-2"> <div><p>Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra.<br><br>Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p></div> </div> </div> </section> <section data-component-title="Header H3" class=""><div class="pbx-relative pbx-py-4"><div class="pbx-mx-auto pbx-max-w-7xl lg:pbx-px-4 pbx-px-2"><div class="pbx-break-words pbx-text-1xl lg:pbx-text-3xl pbx-font-medium"><h3>Fringilla lacus nec metus</h3></div></div></div></section> <section data-component-title="Text" class=""> <div class="pbx-relative pbx-py-4"> <div class="pbx-mx-auto pbx-max-w-7xl lg:pbx-px-4 pbx-px-2"> <div><p>Sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra.</p><ul><li><p><strong>Blorf nizgat quarnip veloop</strong></p></li><li><p><strong>Dramble froop with lartic spindles</strong></p></li><li><p><strong>Quibber on flemt zarglo dynamics</strong></p></li><li><p><strong>Slooped jarnix under flibble zones</strong></p></li><li><p><strong>Plonk-ready trizzit with garm logic</strong></p><p><br></p></li></ul><p>Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p></div> </div> </div> </section> <section data-component-title="Header H3" class=""><div class="pbx-relative pbx-py-4"><div class="pbx-mx-auto pbx-max-w-7xl lg:pbx-px-4 pbx-px-2"><div class="pbx-break-words pbx-text-1xl lg:pbx-text-3xl pbx-font-medium"><h3>Conubia nostra inceptos</h3></div></div></div></section> <section data-component-title="Text"> <div class="pbx-relative pbx-py-4"> <div class="pbx-mx-auto pbx-max-w-7xl lg:pbx-px-4 pbx-px-2"> <div><p>Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. <br><br>Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. <br><br>Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p></div> </div> </div> </section>`,
          category: 'Product',
          cover_image: `
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 177.28 70.84">
                        <defs>
                          <style>
                            .bg { fill: #384152; }
                            .fg { fill: #718096; }
                          </style>
                        </defs>
                        <rect class="bg" width="53.92" height="53.92"/>
                        <rect class="bg" x="62.15" width="53.92" height="53.92"/>
                        <rect class="bg" x="123.37" width="53.92" height="53.92"/>
                        <polygon class="fg" points="8.2 35 21.6 18.92 35 35"/>
                        <polygon class="fg" points="32.32 35 39.02 26.96 45.71 35"/>
                        <circle class="fg" cx="39.02" cy="21.15" r="2.23"/>
                        <polygon class="fg" points="70.36 35 83.75 18.92 97.15 35"/>
                        <polygon class="fg" points="94.47 35 101.17 26.96 107.87 35"/>
                        <circle class="fg" cx="101.17" cy="21.15" r="2.23"/>
                        <polygon class="fg" points="131.57 35 144.96 18.92 158.36 35"/>
                        <polygon class="fg" points="155.68 35 162.38 26.96 169.08 35"/>
                        <circle class="fg" cx="162.38" cy="21.15" r="2.23"/>
                        <rect class="bg" y="59.92" width="53.92" height="2.93"/>
                        <rect class="bg" y="63.91" width="53.92" height="2.93"/>
                        <rect class="bg" y="67.91" width="53.92" height="2.93"/>
                        <rect class="bg" x="62.15" y="59.92" width="53.92" height="2.93"/>
                        <rect class="bg" x="62.15" y="63.91" width="53.92" height="2.93"/>
                        <rect class="bg" x="62.15" y="67.91" width="53.92" height="2.93"/>
                        <rect class="bg" x="123.37" y="59.92" width="53.92" height="2.93"/>
                        <rect class="bg" x="123.37" y="63.91" width="53.92" height="2.93"/>
                        <rect class="bg" x="123.37" y="67.91" width="53.92" height="2.93"/>
                      </svg>
                    `,
        },
        {
          title: 'Show Multiple Products',
          html_code: `<section data-component-title="Header H2"><div class="pbx-relative pbx-py-4"><div class="pbx-mx-auto pbx-max-w-7xl lg:pbx-px-4 pbx-px-2"><div class="pbx-break-words pbx-font-medium pbx-text-3xl lg:pbx-text-6xl"><h2>Inceptos himenaeos</h2></div></div></div></section> <section data-component-title="Text"> <div class="pbx-relative pbx-py-4"> <div class="pbx-mx-auto pbx-max-w-7xl lg:pbx-px-4 pbx-px-2"> <div><p>Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra.<br><br>Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p></div> </div> </div> </section> <section data-component-title="Header H3" class=""><div class="pbx-relative pbx-py-4"><div class="pbx-mx-auto pbx-max-w-7xl lg:pbx-px-4 pbx-px-2"><div class="pbx-break-words pbx-text-1xl lg:pbx-text-3xl pbx-font-medium"><h3>Fringilla lacus nec metus</h3></div></div></div></section> <section data-component-title="Text" class=""> <div class="pbx-relative pbx-py-4"> <div class="pbx-mx-auto pbx-max-w-7xl lg:pbx-px-4 pbx-px-2"> <div><p>Sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra.</p><ul><li><p><strong>Blorf nizgat quarnip veloop</strong></p></li><li><p><strong>Dramble froop with lartic spindles</strong></p></li><li><p><strong>Quibber on flemt zarglo dynamics</strong></p></li><li><p><strong>Slooped jarnix under flibble zones</strong></p></li><li><p><strong>Plonk-ready trizzit with garm logic</strong></p><p><br></p></li></ul><p>Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p></div> </div> </div> </section> <section data-component-title="Header H3" class=""><div class="pbx-relative pbx-py-4"><div class="pbx-mx-auto pbx-max-w-7xl lg:pbx-px-4 pbx-px-2"><div class="pbx-break-words pbx-text-1xl lg:pbx-text-3xl pbx-font-medium"><h3>Conubia nostra inceptos</h3></div></div></div></section> <section data-component-title="Text"> <div class="pbx-relative pbx-py-4"> <div class="pbx-mx-auto pbx-max-w-7xl lg:pbx-px-4 pbx-px-2"> <div><p>Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. <br><br>Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. <br><br>Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p></div> </div> </div> </section>`,
          category: 'Products',
          cover_image: `
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 177.28 70.84">
                        <defs>
                          <style>
                            .bg { fill: #384152; }
                            .fg { fill: #718096; }
                          </style>
                        </defs>
                        <rect class="bg" width="53.92" height="53.92"/>
                        <rect class="bg" x="62.15" width="53.92" height="53.92"/>
                        <rect class="bg" x="123.37" width="53.92" height="53.92"/>
                        <polygon class="fg" points="8.2 35 21.6 18.92 35 35"/>
                        <polygon class="fg" points="32.32 35 39.02 26.96 45.71 35"/>
                        <circle class="fg" cx="39.02" cy="21.15" r="2.23"/>
                        <polygon class="fg" points="70.36 35 83.75 18.92 97.15 35"/>
                        <polygon class="fg" points="94.47 35 101.17 26.96 107.87 35"/>
                        <circle class="fg" cx="101.17" cy="21.15" r="2.23"/>
                        <polygon class="fg" points="131.57 35 144.96 18.92 158.36 35"/>
                        <polygon class="fg" points="155.68 35 162.38 26.96 169.08 35"/>
                        <circle class="fg" cx="162.38" cy="21.15" r="2.23"/>
                        <rect class="bg" y="59.92" width="53.92" height="2.93"/>
                        <rect class="bg" y="63.91" width="53.92" height="2.93"/>
                        <rect class="bg" y="67.91" width="53.92" height="2.93"/>
                        <rect class="bg" x="62.15" y="59.92" width="53.92" height="2.93"/>
                        <rect class="bg" x="62.15" y="63.91" width="53.92" height="2.93"/>
                        <rect class="bg" x="62.15" y="67.91" width="53.92" height="2.93"/>
                        <rect class="bg" x="123.37" y="59.92" width="53.92" height="2.93"/>
                        <rect class="bg" x="123.37" y="63.91" width="53.92" height="2.93"/>
                        <rect class="bg" x="123.37" y="67.91" width="53.92" height="2.93"/>
                      </svg>
                    `,
        },
      ],
    },
  },
]

export default component
