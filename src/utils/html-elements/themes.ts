interface ComponentData {
  title: string
  html_code: string
  cover_image: string | null
  category: string
}

interface Themes {
  themes: {
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

const component: Themes[] = [
  {
    themes: {
      data: [
        {
          title: 'Article',
          html_code: `<div id="pagebuilder" class=" style=""><section data-component-title="Header H2"><div class="pbx-relative pbx-py-4"><div class="pbx-mx-auto pbx-max-w-7xl lg:pbx-px-4 pbx-px-2"><div class="pbx-break-words pbx-font-medium pbx-text-3xl lg:pbx-text-6xl"><h2>Inceptos himenaeos</h2></div></div></div></section> <section data-component-title="Text"> <div class="pbx-relative pbx-py-4"> <div class="pbx-mx-auto pbx-max-w-7xl lg:pbx-px-4 pbx-px-2"> <div><p>Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra.<br><br>Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p></div> </div> </div> </section> <section data-component-title="Header H3" class=""><div class="pbx-relative pbx-py-4"><div class="pbx-mx-auto pbx-max-w-7xl lg:pbx-px-4 pbx-px-2"><div class="pbx-break-words pbx-text-1xl lg:pbx-text-3xl pbx-font-medium"><h3>Fringilla lacus nec metus</h3></div></div></div></section> <section data-component-title="Text" class=""> <div class="pbx-relative pbx-py-4"> <div class="pbx-mx-auto pbx-max-w-7xl lg:pbx-px-4 pbx-px-2"> <div><p>Sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra.</p><ul><li><p><strong>Blorf nizgat quarnip veloop</strong></p></li><li><p><strong>Dramble froop with lartic spindles</strong></p></li><li><p><strong>Quibber on flemt zarglo dynamics</strong></p></li><li><p><strong>Slooped jarnix under flibble zones</strong></p></li><li><p><strong>Plonk-ready trizzit with garm logic</strong></p><p><br></p></li></ul><p>Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p></div> </div> </div> </section> <section data-component-title="Header H3" class=""><div class="pbx-relative pbx-py-4"><div class="pbx-mx-auto pbx-max-w-7xl lg:pbx-px-4 pbx-px-2"><div class="pbx-break-words pbx-text-1xl lg:pbx-text-3xl pbx-font-medium"><h3>Conubia nostra inceptos</h3></div></div></div></section> <section data-component-title="Text"> <div class="pbx-relative pbx-py-4"> <div class="pbx-mx-auto pbx-max-w-7xl lg:pbx-px-4 pbx-px-2"> <div><p>Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. <br><br>Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. <br><br>Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p></div> </div> </div> </section></div>`,
          category: 'Article',
          cover_image: `
												<svg xmlns="http://www.w3.org/2000/svg" viewBox="137.65 124.364 98.186 80.617" width="98.186px" height="80.617px">
													<rect class="bg" x="137.65" width="63.001" height="3.467" style="fill: rgb(56, 65, 82); stroke-width: 1;" y="124.364"/>
													<rect class="bg" x="137.716" width="98.099" height="0.953" style="fill: rgb(56, 65, 82); stroke-width: 1;" y="131.377"/>
													<rect class="bg" x="137.716" width="81.096" height="0.84" style="fill: rgb(56, 65, 82); stroke-width: 1;" y="136.686"/>
													<rect class="bg" x="137.716" width="98.12" height="1.016" style="fill: rgb(56, 65, 82); stroke-width: 1;" y="140.269"/>
													<rect class="bg" x="137.716" width="98.099" height="0.953" style="fill: rgb(56, 65, 82); stroke-width: 1;" y="145.446"/>
													<rect class="bg" x="137.716" width="81.096" height="0.84" style="fill: rgb(56, 65, 82); stroke-width: 1;" y="150.755"/>
													<rect class="bg" x="137.716" width="98.12" height="1.016" style="fill: rgb(56, 65, 82); stroke-width: 1;" y="154.338"/>
													<rect class="bg" x="137.65" width="43.644" height="2.808" style="fill: rgb(56, 65, 82); stroke-width: 1;" y="164.286"/>
													<rect class="bg" x="137.716" width="98.099" height="0.953" style="fill: rgb(56, 65, 82); stroke-width: 1;" y="171.299"/>
													<rect class="bg" x="137.716" width="81.096" height="0.84" style="fill: rgb(56, 65, 82); stroke-width: 1;" y="176.608"/>
													<rect class="bg" x="137.716" width="98.12" height="1.016" style="fill: rgb(56, 65, 82); stroke-width: 1;" y="180.191"/>
													<rect class="bg" x="137.65" width="43.644" height="2.808" style="fill: rgb(56, 65, 82); stroke-width: 1;" y="188.06"/>
													<rect class="bg" x="137.716" width="98.099" height="0.953" style="fill: rgb(56, 65, 82); stroke-width: 1;" y="195.073"/>
													<rect class="bg" x="137.716" width="81.096" height="0.84" style="fill: rgb(56, 65, 82); stroke-width: 1;" y="200.382"/>
													<rect class="bg" x="137.716" width="98.12" height="1.016" style="fill: rgb(56, 65, 82); stroke-width: 1;" y="203.965"/>
												</svg>
					`,
        },
        {
          title: 'Blog Post',
          html_code: `<section data-component-title="Single Image"> <div class="md:pbx-pt-12 md:pbx-pb-12 pbx-pt-4 pbx-pb-4 lg:pbx-px-4 pbx-px-2"><div class="pbx-mx-auto pbx-max-w-7xl"><div class="pbx-myPrimaryGap pbx-grid pbx-grid-cols-1 sm:pbx-grid-cols-1 lg:pbx-grid-cols-1"> <div class="pbx-flex-1 pbx-py-2"> <img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-square " src="${getPlaceholderImageDataUrl()}" alt="provider"></div></div></div></div> </section> <section data-component-title="Header H2" ><div class="pbx-relative pbx-py-4"><div class="pbx-mx-auto pbx-max-w-7xl lg:pbx-px-4 pbx-px-2"><div class="pbx-break-words pbx-font-medium pbx-text-3xl lg:pbx-text-6xl"><h2>Inceptos himenaeos</h2></div></div></div></section> <section data-component-title="Text" > <div class="pbx-relative pbx-py-4"> <div class="pbx-mx-auto pbx-max-w-7xl lg:pbx-px-4 pbx-px-2"> <div><p>Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra.<br><br>Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p></div> </div> </div> </section> <section data-component-title="Header H3" class="" ><div class="pbx-relative pbx-py-4"><div class="pbx-mx-auto pbx-max-w-7xl lg:pbx-px-4 pbx-px-2"><div class="pbx-break-words pbx-text-1xl lg:pbx-text-3xl pbx-font-medium"><h3>Fringilla lacus nec metus</h3></div></div></div></section> <section data-component-title="Text" class="" > <div class="pbx-relative pbx-py-4"> <div class="pbx-mx-auto pbx-max-w-7xl lg:pbx-px-4 pbx-px-2"> <div><p>Sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra.</p><ul><li><p><strong>Blorf nizgat quarnip veloop</strong></p></li><li><p><strong>Dramble froop with lartic spindles</strong></p></li><li><p><strong>Quibber on flemt zarglo dynamics</strong></p></li><li><p><strong>Slooped jarnix under flibble zones</strong></p></li><li><p><strong>Plonk-ready trizzit with garm logic</strong></p><p><br></p></li></ul><p>Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p></div> </div> </div> </section> <section data-component-title="Header H3" class="" ><div class="pbx-relative pbx-py-4"><div class="pbx-mx-auto pbx-max-w-7xl lg:pbx-px-4 pbx-px-2"><div class="pbx-break-words pbx-text-1xl lg:pbx-text-3xl pbx-font-medium"><h3>Conubia nostra inceptos</h3></div></div></div></section> <section data-component-title="Text" > <div class="pbx-relative pbx-py-4"> <div class="pbx-mx-auto pbx-max-w-7xl lg:pbx-px-4 pbx-px-2"> <div><p>Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. <br><br>Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. <br><br>Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p></div> </div> </div> </section> <section data-component-title="Three Square Images"> <div class="md:pbx-pt-12 md:pbx-pb-12 pbx-pt-4 pbx-pb-4 lg:pbx-px-4 pbx-px-2"><div class="pbx-mx-auto pbx-max-w-7xl"><div class="pbx-myPrimaryGap pbx-grid pbx-grid-cols-1 sm:pbx-grid-cols-3 lg:pbx-grid-cols-3"> <div class="pbx-flex-1 pbx-py-2"> <img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-square " src="${getPlaceholderImageDataUrl()}" alt="provider"> </div> <div class="pbx-flex-1 pbx-py-2"> <img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-square " src="${getPlaceholderImageDataUrl()}" alt="provider"> </div> <div class="pbx-flex-1 pbx-py-2"> <img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-square " src="${getPlaceholderImageDataUrl()}" alt="provider"></div></div> </div></div> </section>`,
          category: 'Article',
          cover_image: `
												<svg xmlns="http://www.w3.org/2000/svg" viewBox="137.65 124.364 98.186 80.617" width="98.186px" height="80.617px">
													<rect class="bg" x="137.65" width="63.001" height="3.467" style="fill: rgb(56, 65, 82); stroke-width: 1;" y="124.364"/>
													<rect class="bg" x="137.716" width="98.099" height="0.953" style="fill: rgb(56, 65, 82); stroke-width: 1;" y="131.377"/>
													<rect class="bg" x="137.716" width="81.096" height="0.84" style="fill: rgb(56, 65, 82); stroke-width: 1;" y="136.686"/>
													<rect class="bg" x="137.716" width="98.12" height="1.016" style="fill: rgb(56, 65, 82); stroke-width: 1;" y="140.269"/>
													<rect class="bg" x="137.716" width="98.099" height="0.953" style="fill: rgb(56, 65, 82); stroke-width: 1;" y="145.446"/>
													<rect class="bg" x="137.716" width="81.096" height="0.84" style="fill: rgb(56, 65, 82); stroke-width: 1;" y="150.755"/>
													<rect class="bg" x="137.716" width="98.12" height="1.016" style="fill: rgb(56, 65, 82); stroke-width: 1;" y="154.338"/>
													<rect class="bg" x="137.65" width="43.644" height="2.808" style="fill: rgb(56, 65, 82); stroke-width: 1;" y="164.286"/>
													<rect class="bg" x="137.716" width="98.099" height="0.953" style="fill: rgb(56, 65, 82); stroke-width: 1;" y="171.299"/>
													<rect class="bg" x="137.716" width="81.096" height="0.84" style="fill: rgb(56, 65, 82); stroke-width: 1;" y="176.608"/>
													<rect class="bg" x="137.716" width="98.12" height="1.016" style="fill: rgb(56, 65, 82); stroke-width: 1;" y="180.191"/>
													<rect class="bg" x="137.65" width="43.644" height="2.808" style="fill: rgb(56, 65, 82); stroke-width: 1;" y="188.06"/>
													<rect class="bg" x="137.716" width="98.099" height="0.953" style="fill: rgb(56, 65, 82); stroke-width: 1;" y="195.073"/>
													<rect class="bg" x="137.716" width="81.096" height="0.84" style="fill: rgb(56, 65, 82); stroke-width: 1;" y="200.382"/>
													<rect class="bg" x="137.716" width="98.12" height="1.016" style="fill: rgb(56, 65, 82); stroke-width: 1;" y="203.965"/>
												</svg>
					`,
        },
      ],
    },
  },
]

export default component
