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
// 判斷資料是否存在
// ==================================================

function hasValue(value) {

    // null / undefined
    if (value === null || value === undefined) {
        return false;
    }

    // 空字串
    if (typeof value === 'string' && value.trim() === '') {
        return false;
    }

    // 空陣列
    if (Array.isArray(value) && value.length === 0) {
        return false;
    }

    // false / 0
    if (value === false || value === 0) {
        return false;
    }

    return true;

}


// ==================================================
// 找到配對的區塊結尾
//
// 支援：
// {{#each xxx}}
// {{#if xxx}}
// {{else}}
// {{/each}}
// {{/if}}
//
// 可以巢狀使用
// ==================================================

function findBlockEnd(str, startIndex, blockType) {

    const tokenRegex =
        /\{\{\s*(#each\s+[\w.]+|#if\s+[\w.]+|else|\/each|\/if)\s*\}\}/g;

    tokenRegex.lastIndex = startIndex;

    let depth = 1;
    let match;

    while ((match = tokenRegex.exec(str)) !== null) {

        const token = match[1];


        // ==============================================
        // 找 each 的結尾
        // ==============================================

        if (blockType === 'each') {

            if (token.startsWith('#each')) {

                depth++;

            }

            else if (token === '/each') {

                depth--;

                if (depth === 0) {

                    return {
                        endIndex: match.index,
                        closeEndIndex: tokenRegex.lastIndex
                    };

                }

            }

        }


        // ==============================================
        // 找 if 的結尾
        // ==============================================

        else if (blockType === 'if') {

            if (
                token.startsWith('#if')
            ) {

                depth++;

            }

            else if (token === '/if') {

                depth--;

                if (depth === 0) {

                    return {
                        endIndex: match.index,
                        closeEndIndex: tokenRegex.lastIndex
                    };

                }

            }

        }

    }

    return null;

}


// ==================================================
// 找 if 裡面的 else
//
// 只找「目前這一層」的 else
// ==================================================

function findIfElse(str, startIndex) {

    const tokenRegex =
        /\{\{\s*(#if\s+[\w.]+|#each\s+[\w.]+|else|\/if|\/each)\s*\}\}/g;

    tokenRegex.lastIndex = startIndex;

    let depth = 1;
    let match;

    while ((match = tokenRegex.exec(str)) !== null) {

        const token = match[1];


        // 巢狀 if
        if (token.startsWith('#if')) {

            depth++;

        }

        // 巢狀 each
        else if (token.startsWith('#each')) {

            // each 本身也可能包住 else
            // 這裡不讓它影響 if depth
            continue;

        }

        // if 結尾
        else if (token === '/if') {

            depth--;

            if (depth === 0) {

                return {
                    elseIndex: null,
                    endIndex: match.index,
                    closeEndIndex: tokenRegex.lastIndex
                };

            }

        }

        // else
        else if (
            token === 'else' &&
            depth === 1
        ) {

            // 找到 else 後，
            // 繼續找真正的 /if

            const afterElse =
                tokenRegex.lastIndex;

            const endInfo =
                findIfEnd(
                    str,
                    afterElse
                );

            if (!endInfo) {
                return null;
            }

            return {
                elseIndex: match.index,
                elseEndIndex: afterElse,
                endIndex: endInfo.endIndex,
                closeEndIndex: endInfo.closeEndIndex
            };

        }

    }

    return null;

}


// ==================================================
// 找 if 最後的 /if
// ==================================================

function findIfEnd(str, startIndex) {

    const tokenRegex =
        /\{\{\s*(#if\s+[\w.]+|#each\s+[\w.]+|\/if|\/each)\s*\}\}/g;

    tokenRegex.lastIndex = startIndex;

    let depth = 1;
    let match;

    while ((match = tokenRegex.exec(str)) !== null) {

        const token = match[1];


        if (token.startsWith('#if')) {

            depth++;

        }

        else if (token === '/if') {

            depth--;

            if (depth === 0) {

                return {
                    endIndex: match.index,
                    closeEndIndex: tokenRegex.lastIndex
                };

            }

        }

    }

    return null;

}


// ==================================================
// 處理 {{#each xxx}}
//
// 支援巢狀 each
// ==================================================

function replaceEach(str, data, index = null) {

    const openRegex =
        /\{\{\s*#each\s+([\w.]+)\s*\}\}/;

    let result = str;

    while (true) {

        const match =
            openRegex.exec(result);

        // 沒有 each
        if (!match) {
            break;
        }


        const fullMatch = match[0];

        const path = match[1];

        const startIndex = match.index;

        const contentStart =
            startIndex + fullMatch.length;


        // 找配對的 /each
        const eachEnd =
            findBlockEnd(
                result,
                contentStart,
                'each'
            );


        // 沒找到結尾
        if (!eachEnd) {
            break;
        }


        // 取得模板內容
        const template =
            result.slice(
                contentStart,
                eachEnd.endIndex
            );


        // 取得資料
        const list =
            getValue(
                data,
                path
            );


        let replacement = '';


        // 必須是陣列
        if (Array.isArray(list)) {

            replacement =
                list
                    .map((item, index) => {

                        return replaceVars(
                            template,
                            item,
                            index
                        );

                    })
                    .join('');

        }


        // 替換整個 each
        result =
            result.slice(
                0,
                startIndex
            )
            +
            replacement
            +
            result.slice(
                eachEnd.closeEndIndex
            );

    }

    return result;

}


// ==================================================
// 處理 {{#if xxx}}
//
// 支援：
// {{#if xxx}}
// {{else}}
// {{/if}}
//
// 支援巢狀 if
// ==================================================

function replaceIf(str, data, index = null) {

    const openRegex =
        /\{\{\s*#if\s+([\w.]+)\s*\}\}/;

    let result = str;

    while (true) {

        const match =
            openRegex.exec(result);

        // 沒有 if
        if (!match) {
            break;
        }


        const fullMatch = match[0];

        const path = match[1];

        const startIndex = match.index;

        const contentStart =
            startIndex + fullMatch.length;


        // 找 if 的結尾與 else
        const ifInfo =
            findIfElse(
                result,
                contentStart
            );


        // 找不到結尾
        if (!ifInfo) {
            break;
        }


        let trueContent = '';

        let falseContent = '';


        // ==============================================
        // 有 else
        // ==============================================

        if (
            ifInfo.elseIndex !== null &&
            ifInfo.elseIndex !== undefined
        ) {

            trueContent =
                result.slice(
                    contentStart,
                    ifInfo.elseIndex
                );

            falseContent =
                result.slice(
                    ifInfo.elseEndIndex,
                    ifInfo.endIndex
                );

        }


        // ==============================================
        // 沒有 else
        // ==============================================

        else {

            trueContent =
                result.slice(
                    contentStart,
                    ifInfo.endIndex
                );

        }


        // ==============================================
        // 取得資料
        // ==============================================

        const value =
            getValue(
                data,
                path
            );


        let replacement;


        // ==============================================
        // 判斷 true / false
        // ==============================================

        if (hasValue(value)) {

            replacement =
                trueContent;

        }

        else {

            replacement =
                falseContent;

        }


        // ==============================================
        // 注意：
        // if 裡面可能還有 each / if
        //
        // 所以這裡要再次 replaceVars
        // ==============================================

        replacement =
            replaceVars(
                replacement,
                data,
                index
            );


        // ==============================================
        // 替換整個 if
        // ==============================================

        result =
            result.slice(
                0,
                startIndex
            )
            +
            replacement
            +
            result.slice(
                ifInfo.closeEndIndex
            );

    }

    return result;

}


// ==================================================
// {{ }} 資料替換
// ==================================================

function replaceVars(
    str,
    data,
    index = null
) {

    if (!str) return '';

    let result = str;


    // ==================================================
    // ① 處理 each
    // ==================================================

    result =
        replaceEach(
            result,
            data,
            index
        );


    // ==================================================
    // ② 處理 if
    // ==================================================

    result =
        replaceIf(
            result,
            data,
            index
        );


    // ==================================================
    // ③ {{ xxx }}
    // ==================================================

    for (let i = 0; i < 5; i++) {

        const newResult =
            result.replace(

                /\{\{\s*(.*?)\s*\}\}/g,

                (_, key) => {

                    key = key.trim();


                    // ==============================================
                    // 跳過模板控制語法
                    // ==============================================

                    if (
                        key.startsWith('#') ||
                        key.startsWith('/') ||
                        key === 'else'
                    ) {

                        return '';

                    }


                    // ==============================================
                    // @index
                    // ==============================================

                    if (key === '@index') {

                        return index ?? '';

                    }


                    // ==============================================
                    // @index1
                    // ==============================================

                    if (key === '@index1') {

                        return index !== null
                            ? index + 1
                            : '';

                    }


                    // ==============================================
                    // 一般資料
                    // ==============================================

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

