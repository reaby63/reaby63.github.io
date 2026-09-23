// ==================================================
// Template Engine
// ==================================================


// ==================================================
// 取得物件資料
// ==================================================

function getValue(obj, path) {

    return path
        .split('.')
        .reduce(
            (value, key) => value?.[key],
            obj
        );

}


// ==================================================
// {{ }} 資料替換
// ==================================================

function replaceVars(str, data, index = null) {

    if (!str) return '';

    let result = str;


    // ==================================================
    // ① {{#each xxx}}
    // ==================================================

    const eachRegex =
        /\{\{#each\s+([\w.]+)\s*\}\}([\s\S]*?)\{\{\/each\}\}/g;


    result = result.replace(
        eachRegex,
        (_, path, template) => {

            const list = getValue(
                data,
                path
            );


            if (!Array.isArray(list)) {
                return '';
            }


            return list
                .map((item, index) => {

                    return replaceVars(
                        template,
                        item,
                        index
                    );

                })
                .join('');

        }
    );


    // ==================================================
    // ② {{ xxx }}
    // ==================================================

    for (let i = 0; i < 5; i++) {

        const newResult = result.replace(
            /\{\{\s*(.*?)\s*\}\}/g,
            (_, key) => {

                key = key.trim();


                // ==================================================
                // @index
                // 0、1、2、3...
                // ==================================================

                if (key === '@index') {

                    return index ?? '';

                }


                // ==================================================
                // @index1
                // 1、2、3、4...
                // ==================================================

                if (key === '@index1') {

                    return index !== null
                        ? index + 1
                        : '';

                }


                // ==================================================
                // 一般資料
                // ==================================================

                return getValue(
                    data,
                    key
                ) ?? '';

            }
        );


        if (newResult === result) {
            break;
        }


        result = newResult;

    }


    return result;

}


// ==================================================
// Node.js
// ==================================================
//
// build.js 會使用 require()
// 瀏覽器則直接使用上面的全域函式
// ==================================================

if (
    typeof module !== 'undefined' &&
    module.exports
) {

    module.exports = {
        getValue,
        replaceVars
    };

}