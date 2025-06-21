import { getPlaceholderImageDataUrl } from '../componentPreviews'

interface ComponentData {
  title: string
  html_code: string
  cover_image: string | null // Now optional since we use SVG previews instead of external images
}

interface Components {
  components: {
    data: ComponentData[]
  }
}

// Get the self-contained placeholder image
const placeholderImage = getPlaceholderImageDataUrl()

const component: Components[] = [
  {
    components: {
      data: [
        {
          title: 'Single Image',
          html_code: `<section>\n<div class="pbx-w-full md:pbx-pt-12 md:pbx-pbx-pb-12 pbx-pt-4 pbx-pb-4 lg:pbx-px-4 pbx-px-2"><div class="pbx-mx-auto max-w-7xl"><div class="pbx-myPrimaryGap pbx-grid pbx-grid-cols-1 sm:pbx-grid-cols-1 lg:pbx-grid-cols-1"> <div class="pbx-flex-1 pbx-py-2"> <img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-square pbx-smooth-transition" src="${placeholderImage}" alt="provider"></div></div></div></div>\n</section>`,
          cover_image: null,
        },
        {
          title: '2 Vertical Images',
          html_code: `<section>\n<div class="pbx-w-full md:pbx-pt-12 md:pbx-pbx-pb-12 pbx-pt-4 pbx-pb-4 lg:pbx-px-4 pbx-px-2"><div class="pbx-mx-auto max-w-7xl"><div class="pbx-myPrimaryGap pbx-grid pbx-grid-cols-2 sm:pbx-grid-cols-2 lg:pbx-grid-cols-2"> <div class="pbx-flex-1 pbx-py-2"> <img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-[9/16] pbx-smooth-transition" src="${placeholderImage}" alt="provider">  </div> <div class="pbx-flex-1 pbx-py-2"> <img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-[9/16] pbx-smooth-transition" src="${placeholderImage}" alt="provider">  </div>   </div> </div> </div>\n</section>`,
          cover_image: null,
        },
        {
          title: '2 Square Images',
          html_code: `<section>\n<div class="pbx-w-full md:pbx-pt-12 md:pbx-pbx-pb-12 pbx-pt-4 pbx-pb-4 lg:pbx-px-4 pbx-px-2"><div class="pbx-mx-auto max-w-7xl"><div class="pbx-myPrimaryGap pbx-grid pbx-grid-cols-1 sm:pbx-grid-cols-2 lg:pbx-grid-cols-2"> <div class="pbx-flex-1 pbx-py-2"> <img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-square pbx-smooth-transition" src="${placeholderImage}" alt="provider">  </div> <div class="pbx-flex-1 pbx-py-2"> <img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-square pbx-smooth-transition" src="${placeholderImage}" alt="provider"></div></div> </div></div>\n</section>`,
          cover_image: null,
        },
        {
          title: '3 Square Images',
          html_code: `<section>\n<div class="pbx-w-full md:pbx-pt-12 md:pbx-pbx-pb-12 pbx-pt-4 pbx-pb-4 lg:pbx-px-4 pbx-px-2"><div class="pbx-mx-auto max-w-7xl"><div class="pbx-myPrimaryGap pbx-grid pbx-grid-cols-1 sm:pbx-grid-cols-3 lg:pbx-grid-cols-3"> <div class="pbx-flex-1 pbx-py-2"> <img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-square pbx-smooth-transition" src="${placeholderImage}" alt="provider">  </div> <div class="pbx-flex-1 pbx-py-2"> <img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-square pbx-smooth-transition" src="${placeholderImage}" alt="provider">  </div> <div class="pbx-flex-1 pbx-py-2"> <img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-square pbx-smooth-transition" src="${placeholderImage}" alt="provider"></div></div> </div></div>\n</section>`,
          cover_image: null,
        },
        {
          title: '6 Square Images Grid',
          html_code: `<section>\n<div class="pbx-w-full md:pbx-pt-12 md:pbx-pbx-pb-12 pbx-pt-4 pbx-pb-4 lg:pbx-px-4 pbx-px-2">\n<div class="pbx-mx-auto max-w-7xl">\n<div class="pbx-grid pbx-grid-cols-2 md:pbx-grid-cols-3 pbx-myPrimaryGap">\n\n<div>\n<img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-square pbx-smooth-transition" src="${placeholderImage}" alt="image">\n</div>\n\n<div>\n<img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-square pbx-smooth-transition" src="${placeholderImage}" alt="image">\n</div>\n\n<div>\n<img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-square pbx-smooth-transition" src="${placeholderImage}" alt="image">\n</div>\n\n<div>\n<img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-square pbx-smooth-transition" src="${placeholderImage}" alt="image">\n</div>\n\n<div>\n<img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-square pbx-smooth-transition" src="${placeholderImage}" alt="image">\n</div>\n\n<div>\n<img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-square pbx-smooth-transition" src="${placeholderImage}" alt="image">\n</div>\n\n</div>\n</div>\n</div>\n</section>`,
          cover_image: null,
        },
        {
          title: 'Two Square Images With Text',
          html_code: `<section>\n<div class="pbx-w-full md:pbx-pt-12 md:pbx-pbx-pb-12 pbx-pt-4 pbx-pb-4 lg:pbx-px-4 pbx-px-2"><div class="pbx-mx-auto max-w-7xl">\n<div class="pbx-myPrimaryGap lg:pbx-flex lg:pbx-justify-center"><div class="pbx-flex-1 pbx-py-2">\n<div class="pbx-grid pbx-myPrimaryGap pbx-grid-cols-1 lg:pbx-grid-cols-2"> <div class="pbx-flex-1 pbx-py-2"> <img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-square pbx-smooth-transition" src="${placeholderImage}" alt="provider">  </div> <div class="pbx-flex-1 pbx-py-2"> <img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-square pbx-smooth-transition" src="${placeholderImage}" alt="provider">  </div>   </div> </div>\n\n<div class="pbx-flex-1 pbx-py-2"> <div class="pbx-break-words pbx-py-2"><p><strong>Title</strong></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div></div> \n</div></div></div>\n</section>`,
          cover_image: null,
        },
        {
          title: '3 Vertical Images',
          html_code: `<section>\n<div class="pbx-w-full md:pbx-pt-12 md:pbx-pbx-pb-12 pbx-pt-4 pbx-pb-4 lg:pbx-px-4 pbx-px-2"><div class="pbx-mx-auto max-w-7xl"><div class="pbx-myPrimaryGap pbx-grid pbx-grid-cols-1 sm:pbx-grid-cols-3 lg:pbx-grid-cols-3"> <div class="pbx-flex-1 pbx-py-2"> <img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-[9/16] pbx-smooth-transition" src="${placeholderImage}" alt="provider">  </div> <div class="pbx-flex-1 pbx-py-2"> <img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-[9/16] pbx-smooth-transition" src="${placeholderImage}" alt="provider">  </div> <div class="pbx-flex-1 pbx-py-2"> <img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-[9/16] pbx-smooth-transition" src="${placeholderImage}" alt="provider"></div></div> </div></div>\n</section>`,
          cover_image: null,
        },
        {
          title: '4 Square Images With Text',
          html_code: `<section>\n<div class="pbx-w-full md:pbx-pt-12 md:pbx-pbx-pb-12 pbx-pt-4 pbx-pb-4 lg:pbx-px-4 pbx-px-2"><div class="pbx-mx-auto max-w-7xl"><div class="pbx-myPrimaryGap pbx-grid pbx-grid-cols-2 sm:pbx-grid-cols-2 lg:pbx-grid-cols-4"> <div class="pbx-flex-1 pbx-py-2"> <img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-square pbx-smooth-transition" src="${placeholderImage}" alt="provider"> <div class="pbx-break-words pbx-py-2"><p>Layouts and visual.</p><p>Ullamcorper dignissim cras tincidunt.</p></div> </div> <div class="pbx-flex-1 pbx-py-2"> <img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-square pbx-smooth-transition" src="${placeholderImage}" alt="provider"> <div class="pbx-break-words pbx-py-2"><p>Layouts and visual.</p><p>Ullamcorper dignissim cras tincidunt.</p></div> </div> <div class="pbx-flex-1 pbx-py-2"> <img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-square pbx-smooth-transition" src="${placeholderImage}" alt="provider"> <div class="pbx-break-words pbx-py-2"><p>Layouts and visual.</p><p>Ullamcorper dignissim cras tincidunt.</p></div> </div> <div class="pbx-flex-1 pbx-py-2"> <img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-square pbx-smooth-transition" src="${placeholderImage}" alt="provider"><div class="pbx-break-words pbx-py-2"><p>Layouts and visual.</p><p>Ullamcorper dignissim cras tincidunt.</p></div> </div> </div> </div> </div>\n</section>`,
          cover_image: null,
        },
        {
          title: '3 Square Images With Text',
          html_code: `<section>\n<div class="pbx-w-full md:pbx-pt-12 md:pbx-pbx-pb-12 pbx-pt-4 pbx-pb-4 lg:pbx-px-4 pbx-px-2"><div class="pbx-mx-auto max-w-7xl"><div class="pbx-myPrimaryGap pbx-grid pbx-grid-cols-1 sm:pbx-grid-cols-3 lg:pbx-grid-cols-3"> <div class="pbx-flex-1 pbx-py-2"> <img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-square pbx-smooth-transition" src="${placeholderImage}" alt="provider"> <div class="pbx-break-words pbx-py-2"><p>Layouts and visual.</p><p>Ullamcorper dignissim cras tincidunt.</p></div> </div> <div class="pbx-flex-1 pbx-py-2"> <img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-square pbx-smooth-transition" src="${placeholderImage}" alt="provider"> <div class="pbx-break-words pbx-py-2"><p>Layouts and visual.</p><p>Ullamcorper dignissim cras tincidunt.</p></div> </div> <div class="pbx-flex-1 pbx-py-2"> <img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-square pbx-smooth-transition" src="${placeholderImage}" alt="provider"> <div class="pbx-break-words pbx-py-2"><p>Layouts and visual.</p><p>Ullamcorper dignissim cras tincidunt.</p></div> </div>  </div> </div> </div>\n</section>`,
          cover_image: null,
        },
        {
          title: '2 Square Images With Text',
          html_code: `<section>\n<div class="pbx-w-full md:pbx-pt-12 md:pbx-pbx-pb-12 pbx-pt-4 pbx-pb-4 lg:pbx-px-4 pbx-px-2"><div class="pbx-mx-auto max-w-7xl"><div class="pbx-myPrimaryGap pbx-grid pbx-grid-cols-2 sm:pbx-grid-cols-2 lg:pbx-grid-cols-2"> <div class="pbx-flex-1 pbx-py-2"> <img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-square pbx-smooth-transition" src="${placeholderImage}" alt="provider"> <div class="pbx-break-words pbx-py-2"><p>Layouts and visual.</p><p>Ullamcorper dignissim cras tincidunt.</p></div> </div> <div class="pbx-flex-1 pbx-py-2"> <img class="pbx-object-cover pbx-w-full pbx-object-top pbx-aspect-square pbx-smooth-transition" src="${placeholderImage}" alt="provider"> <div class="pbx-break-words pbx-py-2"><p>Layouts and visual.</p><p>Ullamcorper dignissim cras tincidunt.</p></div> </div>   </div> </div> </div>\n</section>`,
          cover_image: null,
        },
      ],
    },
  },
]

export default component
