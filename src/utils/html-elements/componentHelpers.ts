interface ComponentHelper {
  html_code: string
  id: string | null
  title: string
  icon: string
}

const componentHelpers: ComponentHelper[] = [
  {
    html_code: `
    <section>
    <div class="pbx-relative pbx-py-4">
    <div class="pbx-mx-auto max-w-7xl lg:pbx-px-4 pbx-px-2">
    <div>
    <p><strong>Text</strong></p><p>Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Erat nam at lectus urna duis convallis convallis. Congue mauris rhoncus aenean vel elit scelerisque. 
    Turpis tincidunt id aliquet risus feugiat in ante. Tincidunt dui ut ornare lectus sit. Ipsum dolor sit amet consectetur. Viverra ipsum nunc aliquet bibendum enim facilisis gravida neque convallis.<br><br>Dignissim sodales ut eu sem integer vitae justo eget magna. 
    Ac turpis egestas maecenas pharetra convallis. Mauris sit amet massa vitae. Ut tellus elementum sagittis vitae et. Sed risus ultricies tristique nulla aliquet enim tortor. Nunc mattis enim ut tellus elementum sagittis vitae et leo. Quis vel eros donec ac odio tempor. 
    Faucibus scelerisque eleifend donec pretium. <br><br>Adipiscing bibendum est ultricies integer quis auctor elit. Vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet. Id porta nibh venenatis cras sed felis eget. Gravida dictum fusce ut placerat orci nulla. 
    Sunt in culpa qui officia deserunt nisi vitae suscipit tellus mauris. <br><br></p><p><strong>List</strong></p><ul><li><p>Integer enim neque volutpat ac tincidunt vitae semper quis. Sit amet consectetur adipiscing elit pellentesque.</p></li><li><p>Urna cursus eget nunc scelerisque viverra. 
    Cursus metus aliquam eleifend mi in nulla posuere. Lobortis elementum nibh tellus molestie nunc non blandit massa.</p></li><li><p>Sodales ut eu sem integer vitae justo eget magna. Scelerisque felis imperdiet proin fermentum leo vel orci. Nunc id cursus metus aliquam eleifend.</p></li></ul>
    </div>
    </div>
    </div>
    </section>`,
    id: null,
    title: 'Text',
    icon: `
    <span class="material-symbols-outlined">
    text_fields
    </span>
    `,
  },
  {
    html_code: `<section><div class="pbx-relative pbx-py-4"><div class="pbx-mx-auto max-w-7xl lg:pbx-px-4 pbx-px-2"><div class="pbx-break-words"><h2>Sunt in culpa qui officia deserunt</h2></div></div></div></section>`,
    id: null,
    title: 'Header H2',
    icon: `
    <span class="material-symbols-outlined">
    format_h2
    </span>
    `,
  },
  {
    html_code: `<section><div class="pbx-relative pbx-py-4"><div class="pbx-mx-auto max-w-7xl lg:pbx-px-4 pbx-px-2"><div class="pbx-break-words"><h3>Sunt in culpa qui officia deserunt</h3></div></div></div></section>`,
    id: null,
    title: 'Header H3',
    icon: `
    <span class="material-symbols-outlined">
    format_h3
    </span>
    `,
  },
  {
    html_code: `
    <section>
    <div class="pbx-py-4">
    <div class="pbx-mx-auto max-w-7xl pbx-w-full pbx-pt-6 pbx-pb-6 pbx-bg-gray-100">
    <div  id="youtube-video" class="pbx-w-full pbx-aspect-video pbx-p-4">

    <iframe
    frameborder="0" 
    allowfullscreen
    class="pbx-w-full pbx-aspect-video"
    src="" 
    allow="accelerometer; autoplay; clipboard-write;" allowfullscreen>
    </iframe>
    </div>
    </div>
    </div>
    </section>`,
    id: null,
    title: 'YouTube Video',
    icon: `
    <span class="material-symbols-outlined">
    play_circle
    </span>
    `,
  },
  {
    html_code: `<section><div class="pbx-relative pbx-py-8"><div class="pbx-absolute pbx-inset-0 pbx-flex pbx-items-center" aria-hidden="true"><div class="pbx-w-full pbx-border-4 pbx-border-gray-800 pbx-leading-none"></div></div><div class="pbx-relative pbx-flex pbx-justify-start"></div></div></section>`,
    id: null,
    title: 'Break Divider',
    icon: `
    <span class="material-symbols-outlined">
    horizontal_rule
    </span>
    `,
  },
  {
    html_code: `<section>\n<div class=\"w-full md:pt-2 md:pbx-pb-2 pt-4 pbx-pb-4 lg:px-4 px-2\">\n<div class=\"mx-auto max-w-7xl\">\n<div id=\"linktree\"\nclass=\"flex items-centre justify-start font-medium text-black bg-gray-200\">\n\n<a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://www.google.com\">Link to landing page</a>\n</div>\n</div>\n</div>\n</section>`,
    id: null,
    title: 'Link',
    icon: `
        <span class="material-symbols-outlined">
        link
        </span>
        `,
  },
]

export default componentHelpers
