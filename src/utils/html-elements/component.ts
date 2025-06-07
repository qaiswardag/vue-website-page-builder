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
          html_code: `<section>\n<div class="w-full md:pt-12 md:pb-12 pt-4 pb-4 lg:px-4 px-2"><div class="mx-auto max-w-7xl"><div class="myPrimaryGap grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1"> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square smooth-transition" src="${placeholderImage}" alt="provider"></div></div></div></div>\n</section>`,
          cover_image: null,
        },
        {
          title: '2 vertical images',
          html_code: `<section>\n<div class="w-full md:pt-12 md:pb-12 pt-4 pb-4 lg:px-4 px-2"><div class="mx-auto max-w-7xl"><div class="myPrimaryGap grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2"> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-[9/16] smooth-transition" src="${placeholderImage}" alt="provider">  </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-[9/16] smooth-transition" src="${placeholderImage}" alt="provider">  </div>   </div> </div> </div>\n</section>`,
          cover_image: null,
        },
        {
          title: '2 images',
          html_code: `<section>\n<div class="w-full md:pt-12 md:pb-12 pt-4 pb-4 lg:px-4 px-2"><div class="mx-auto max-w-7xl"><div class="myPrimaryGap grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3"> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square smooth-transition" src="${placeholderImage}" alt="provider">  </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square smooth-transition" src="${placeholderImage}" alt="provider">  </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square smooth-transition" src="${placeholderImage}" alt="provider"></div></div> </div></div>\n</section>`,
          cover_image: null,
        },
        {
          title: '3 images',
          html_code: `<section>\n<div class="w-full md:pt-12 md:pb-12 pt-4 pb-4 lg:px-4 px-2"><div class="mx-auto max-w-7xl"><div class="myPrimaryGap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square smooth-transition" src="${placeholderImage}" alt="provider">  </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square smooth-transition" src="${placeholderImage}" alt="provider"></div></div> </div></div>\n</section>`,
          cover_image: null,
        },
        {
          title: '6 Images Grid',
          html_code: `<section>\n<div class="w-full md:pt-12 md:pb-12 pt-4 pb-4 lg:px-4 px-2">\n<div class="mx-auto max-w-7xl">\n<div class="grid grid-cols-2 md:grid-cols-3 myPrimaryGap">\n\n<div>\n<img class="object-cover w-full object-top aspect-square smooth-transition" src="${placeholderImage}" alt="image">\n</div>\n\n<div>\n<img class="object-cover w-full object-top aspect-square smooth-transition" src="${placeholderImage}" alt="image">\n</div>\n\n<div>\n<img class="object-cover w-full object-top aspect-square smooth-transition" src="${placeholderImage}" alt="image">\n</div>\n\n<div>\n<img class="object-cover w-full object-top aspect-square smooth-transition" src="${placeholderImage}" alt="image">\n</div>\n\n<div>\n<img class="object-cover w-full object-top aspect-square smooth-transition" src="${placeholderImage}" alt="image">\n</div>\n\n<div>\n<img class="object-cover w-full object-top aspect-square smooth-transition" src="${placeholderImage}" alt="image">\n</div>\n\n</div>\n</div>\n</div>\n</section>`,
          cover_image: null,
        },
        {
          title: 'Two Images With Right Text Top',
          html_code: `<section>\n<div class="w-full md:pt-12 md:pb-12 pt-4 pb-4 lg:px-4 px-2"><div class="mx-auto max-w-7xl">\n<div class="myPrimaryGap lg:flex lg:justify-center"><div class="flex-1 py-2">\n<div class="grid myPrimaryGap grid-cols-1 lg:grid-cols-2"> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square smooth-transition" src="${placeholderImage}" alt="provider">  </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square smooth-transition" src="${placeholderImage}" alt="provider">  </div>   </div> </div>\n\n<div class="flex-1 py-2"> <div class="break-words py-2"><p><strong>Title</strong></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div></div> \n</div></div></div>\n</section>`,
          cover_image: null,
        },
        {
          title: '3 Vertical Images',
          html_code: `<section>\n<div class="w-full md:pt-12 md:pb-12 pt-4 pb-4 lg:px-4 px-2"><div class="mx-auto max-w-7xl"><div class="myPrimaryGap grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3"> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-[9/16] smooth-transition" src="${placeholderImage}" alt="provider">  </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-[9/16] smooth-transition" src="${placeholderImage}" alt="provider">  </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-[9/16] smooth-transition" src="${placeholderImage}" alt="provider"></div></div> </div></div>\n</section>`,
          cover_image: null,
        },
        {
          title: 'Link Button',
          html_code:
            '<section>\n<div class="w-full md:pt-2 md:pb-2 pt-4 pb-4 lg:px-4 px-2">\n<div class="mx-auto max-w-7xl">\n<div id="linktree" class="border-2 border-gray-600 flex items-centre justify-start rounded-md font-medium text-black">\n<p>\n<a target="_blank" rel="noopener noreferrer nofollow" href="https://www.example.com">Link to landing page</a>\n</p>\n</div>\n</div>\n</div>\n</section>',
          cover_image: null,
        },
        {
          title: '4 Images With Text',
          html_code: `<section>\n<div class="w-full md:pt-12 md:pb-12 pt-4 pb-4 lg:px-4 px-2"><div class="mx-auto max-w-7xl"><div class="myPrimaryGap grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4"> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square smooth-transition" src="${placeholderImage}" alt="provider"> <div class="break-words py-2"><p>Layouts and visual.</p><p>Ullamcorper dignissim cras tincidunt.</p></div> </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square smooth-transition" src="${placeholderImage}" alt="provider"> <div class="break-words py-2"><p>Layouts and visual.</p><p>Ullamcorper dignissim cras tincidunt.</p></div> </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square smooth-transition" src="${placeholderImage}" alt="provider"> <div class="break-words py-2"><p>Layouts and visual.</p><p>Ullamcorper dignissim cras tincidunt.</p></div> </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square smooth-transition" src="${placeholderImage}" alt="provider"><div class="break-words py-2"><p>Layouts and visual.</p><p>Ullamcorper dignissim cras tincidunt.</p></div> </div> </div> </div> </div>\n</section>`,
          cover_image: null,
        },
        {
          title: '3 Images With Text',
          html_code: `<section>\n<div class="w-full md:pt-12 md:pb-12 pt-4 pb-4 lg:px-4 px-2"><div class="mx-auto max-w-7xl"><div class="myPrimaryGap grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3"> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square smooth-transition" src="${placeholderImage}" alt="provider"> <div class="break-words py-2"><p>Layouts and visual.</p><p>Ullamcorper dignissim cras tincidunt.</p></div> </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square smooth-transition" src="${placeholderImage}" alt="provider"> <div class="break-words py-2"><p>Layouts and visual.</p><p>Ullamcorper dignissim cras tincidunt.</p></div> </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square smooth-transition" src="${placeholderImage}" alt="provider"> <div class="break-words py-2"><p>Layouts and visual.</p><p>Ullamcorper dignissim cras tincidunt.</p></div> </div>  </div> </div> </div>\n</section>`,
          cover_image: null,
        },
        {
          title: '2 Images With Text',
          html_code: `<section>\n<div class="w-full md:pt-12 md:pb-12 pt-4 pb-4 lg:px-4 px-2"><div class="mx-auto max-w-7xl"><div class="myPrimaryGap grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2"> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square smooth-transition" src="${placeholderImage}" alt="provider"> <div class="break-words py-2"><p>Layouts and visual.</p><p>Ullamcorper dignissim cras tincidunt.</p></div> </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square smooth-transition" src="${placeholderImage}" alt="provider"> <div class="break-words py-2"><p>Layouts and visual.</p><p>Ullamcorper dignissim cras tincidunt.</p></div> </div>   </div> </div> </div>\n</section>`,
          cover_image: null,
        },
      ],
    },
  },
]

export default component
