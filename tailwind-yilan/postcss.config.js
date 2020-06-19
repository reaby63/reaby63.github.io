// postcss.config.js
const purgecss = require('@fullhuman/postcss-purgecss')({

    // Specify the paths to all of the template files in your project
    //幫忙讀下列三種副檔名是不是有用到tailwind裡面的class，如果有只會幫你打包有用到的class
    content: [
      './src/**/*.html',
      './src/**/*.vue',
      './src/**/*.jsx',
      // etc.
    ],
  
    // This is the function used to extract class names from your templates
    defaultExtractor: content => {
      // Capture as liberally as possible, including things like `h-(screen-1.5)`
      const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []
  
      // Capture classes within other delimiters like .block(class="w-1/2") in Pug
      const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || []
  
      return broadMatches.concat(innerMatches)
    }
  })


module.exports = {
    plugins: [
      require('tailwindcss'),
      require('autoprefixer'),
      ...process.env.NODE_ENV === 'production'
      ? [purgecss]
      : []
    ]
  }

  //上面那小塊：處理tailwindcss 以及 不同瀏覽器需要加的前贅字！
  //上面那小塊的 下面三行：幫忙打包有用到的class！ 瘦身檔案