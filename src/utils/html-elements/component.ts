import { getPlaceholderImageDataUrl } from '../componentPreviews'
import { useTranslations } from '../../composables/useTranslations'
const { translate } = useTranslations()

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
          html_code: `<section>\n<div class="w-full md:pt-12 md:pb-12 pt-4 pb-4 lg:px-4 px-2"><div class="mx-auto max-w-7xl"><div class="myPrimaryGap grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1"> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${placeholderImage}" alt="provider"></div></div></div></div>\n</section>`,
          cover_image: null,
        },
        {
          title: '2 Vertical Images',
          html_code: `<section>\n<div class="w-full md:pt-12 md:pb-12 pt-4 pb-4 lg:px-4 px-2"><div class="mx-auto max-w-7xl"><div class="myPrimaryGap grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2"> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-[9/16] " src="${placeholderImage}" alt="provider">  </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-[9/16] " src="${placeholderImage}" alt="provider">  </div>   </div> </div> </div>\n</section>`,
          cover_image: null,
        },
        {
          title: '2 Square Images',
          html_code: `<section>\n<div class="w-full md:pt-12 md:pb-12 pt-4 pb-4 lg:px-4 px-2"><div class="mx-auto max-w-7xl"><div class="myPrimaryGap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${placeholderImage}" alt="provider">  </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${placeholderImage}" alt="provider"></div></div> </div></div>\n</section>`,
          cover_image: null,
        },
        {
          title: '3 Square Images',
          html_code: `<section>\n<div class="w-full md:pt-12 md:pb-12 pt-4 pb-4 lg:px-4 px-2"><div class="mx-auto max-w-7xl"><div class="myPrimaryGap grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3"> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${placeholderImage}" alt="provider">  </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${placeholderImage}" alt="provider">  </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${placeholderImage}" alt="provider"></div></div> </div></div>\n</section>`,
          cover_image: null,
        },
        {
          title: '6 Square Images Grid',
          html_code: `<section>\n<div class="w-full md:pt-12 md:pb-12 pt-4 pb-4 lg:px-4 px-2">\n<div class="mx-auto max-w-7xl">\n<div class="grid grid-cols-2 md:grid-cols-3 myPrimaryGap">\n\n<div>\n<img class="object-cover w-full object-top aspect-square " src="${placeholderImage}" alt="image">\n</div>\n\n<div>\n<img class="object-cover w-full object-top aspect-square " src="${placeholderImage}" alt="image">\n</div>\n\n<div>\n<img class="object-cover w-full object-top aspect-square " src="${placeholderImage}" alt="image">\n</div>\n\n<div>\n<img class="object-cover w-full object-top aspect-square " src="${placeholderImage}" alt="image">\n</div>\n\n<div>\n<img class="object-cover w-full object-top aspect-square " src="${placeholderImage}" alt="image">\n</div>\n\n<div>\n<img class="object-cover w-full object-top aspect-square " src="${placeholderImage}" alt="image">\n</div>\n\n</div>\n</div>\n</div>\n</section>`,
          cover_image: null,
        },
        {
          title: 'Two Square Images With Text',
          html_code: `<section>\n<div class="w-full md:pt-12 md:pb-12 pt-4 pb-4 lg:px-4 px-2"><div class="mx-auto max-w-7xl">\n<div class="myPrimaryGap lg:flex lg:justify-center"><div class="flex-1 py-2">\n<div class="grid myPrimaryGap grid-cols-1 lg:grid-cols-2"> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${placeholderImage}" alt="provider">  </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${placeholderImage}" alt="provider">  </div>   </div> </div>\n\n<div class="flex-1 py-2"> <div class="break-words py-2"><p>Start customizing by editing this default text directly in the editor.</p></div></div> \n</div></div></div>\n</section>`,
          cover_image: null,
        },
        {
          title: '3 Vertical Images',
          html_code: `<section>\n<div class="w-full md:pt-12 md:pb-12 pt-4 pb-4 lg:px-4 px-2"><div class="mx-auto max-w-7xl"><div class="myPrimaryGap grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3"> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-[9/16] " src="${placeholderImage}" alt="provider">  </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-[9/16] " src="${placeholderImage}" alt="provider">  </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-[9/16] " src="${placeholderImage}" alt="provider"></div></div> </div></div>\n</section>`,
          cover_image: null,
        },
        {
          title: '4 Square Images With Text',
          html_code: `<section>\n<div class="w-full md:pt-12 md:pb-12 pt-4 pb-4 lg:px-4 px-2"><div class="mx-auto max-w-7xl"><div class="myPrimaryGap grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4"> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${placeholderImage}" alt="provider"> <div class="break-words py-2"><p>Layouts and visual.</p><p>Start customizing by editing this default text directly in the editor.</p></div> </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${placeholderImage}" alt="provider"> <div class="break-words py-2"><p>Layouts and visual.</p><p>Start customizing by editing this default text directly in the editor.</p></div> </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${placeholderImage}" alt="provider"> <div class="break-words py-2"><p>Layouts and visual.</p><p>Start customizing by editing this default text directly in the editor.</p></div> </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${placeholderImage}" alt="provider"><div class="break-words py-2"><p>Layouts and visual.</p><p>Start customizing by editing this default text directly in the editor.</p></div> </div> </div> </div> </div>\n</section>`,
          cover_image: null,
        },
        {
          title: '3 Square Images With Text',
          html_code: `<section>\n<div class="w-full md:pt-12 md:pb-12 pt-4 pb-4 lg:px-4 px-2"><div class="mx-auto max-w-7xl"><div class="myPrimaryGap grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3"> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${placeholderImage}" alt="provider"> <div class="break-words py-2"><p>Layouts and visual.</p><p>Start customizing by editing this default text directly in the editor.</p></div> </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${placeholderImage}" alt="provider"> <div class="break-words py-2"><p>Layouts and visual.</p><p>Start customizing by editing this default text directly in the editor.</p></div> </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${placeholderImage}" alt="provider"> <div class="break-words py-2"><p>Layouts and visual.</p><p>Start customizing by editing this default text directly in the editor.</p></div> </div>  </div> </div> </div>\n</section>`,
          cover_image: null,
        },
        {
          title: '2 Square Images With Text',
          html_code: `<section>\n<div class="w-full md:pt-12 md:pb-12 pt-4 pb-4 lg:px-4 px-2"><div class="mx-auto max-w-7xl"><div class="myPrimaryGap grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2"> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${placeholderImage}" alt="provider"> <div class="break-words py-2"><p>Layouts and visual.</p><p>Start customizing by editing this default text directly in the editor.</p></div> </div> <div class="flex-1 py-2"> <img class="object-cover w-full object-top aspect-square " src="${placeholderImage}" alt="provider"> <div class="break-words py-2"><p>Layouts and visual.</p><p>Start customizing by editing this default text directly in the editor.</p></div> </div>   </div> </div> </div>\n</section>`,
          cover_image: null,
        },
      ],
    },
  },
]

export default component
