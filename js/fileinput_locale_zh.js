/*!
 * FileInput Spanish (Latin American) Translations
 *
 * This file must be loaded after 'fileinput.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * @see http://github.com/kartik-v/bootstrap-fileinput
 *
 * NOTE: this file must be saved in UTF-8 encoding.
 */
(function ($) {
    "use strict";
    $.fn.fileinput.locales.es = {
    		fileSingle: '单个文件',
            filePlural: '多个文件',
            browseLabel: '选择文件 &hellip;',
            removeLabel: '删除文件',
            removeTitle: '删除选中文件',
            cancelLabel: '取消',
            cancelTitle: '取消上传',
            uploadLabel: '上传',
            uploadTitle: '上传选中文件',
            msgSizeTooLarge: '文件 "{name}" (<b>{size} KB</b>) 超出指定大小 <b>{maxSize} KB</b>. 请重新选择!',
            msgFilesTooLess: '文件数量必须大于 <b>{n}</b> {files} ，请重新上传！',
            msgFilesTooMany: '上传的图片总数 <b>({n})</b> 超过允许的范围值 <b>{m}</b>. 请删除部分文件后上传',
            msgFileNotFound: '文件 "{name}" 未找到!',
            msgFileSecured: 'Security restrictions prevent reading the file "{name}".',
            msgFileNotReadable: '文件 "{name}" 不可读取.',
            msgFilePreviewAborted: '文件预览失败 "{name}".',
            msgFilePreviewError: '文件预览时出错 "{name}".',
            msgInvalidFileType: '无效的文件类型 "{name}". 以下类型 "{types}" 文件可以被上传.',
            msgInvalidFileExtension: '无效的文件扩展名 "{name}". 以下扩展名 "{extensions}" 可被上传.',
            msgValidationError: '文件上传失败',
            msgLoading: '文件加载中 {index} of {files} 请稍后',
            msgProgress: '上传中.... {index} of {files} - {name} - {percent}% completed.',
            msgSelected: '选中{n}个文件',
            msgFoldersNotAllowed: '拖拽的文件只可以是! {n} 这一类文件 请重新选择.',
            dropZoneTitle: '拖拽文件到这里进行上传'
    };

    $.extend($.fn.fileinput.defaults, $.fn.fileinput.locales.es);
})(window.jQuery);
