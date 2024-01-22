/**
 * format millisecond to `mm:ss`
 * @description 处理时间的方法
 * @param {number} ms
 */
export const handleDuration = (ms) => {
    if (typeof ms !== 'number') return '00:00';
    const t = ms / 1000;
    const m = Math.floor(t / 60);
    const mm = m > 9 ? `${m}` : `0${m}`;
    const s = Math.floor(t % 60);
    const ss = s > 9 ? `${s}` : `0${s}`;
    return `${mm}:${ss}`;
}

/**
 * @description 处理数组的方法
 * @param {data} array
 */
export const handleArray = (array) => {
    let result = array.map(item => {
        return {
            value: item.name,
            key: item.id
        }
    });

    return result;
}

/**
 * @description 空数组
 */
export const emptyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * @description 处理时间的方法
 * @param {time} 时间戳time
 */
export const formatDate = (time) => {
    const dt = new Date(time);
    return dt.toLocaleDateString('zh', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
};

/* 
这个函数formatDate是一个用于格式化日期的函数。它接受一个时间参数time，并返回一个格式化后的日期字符串。

让我们逐行分析这个函数的功能：

const dt = new Date(time);：这一行创建了一个新的Date对象，将传入的time参数作为参数传递给构造函数。这样就创建了一个表示给定时间的日期对象dt。

return dt.toLocaleDateString('zh', { year: 'numeric', month: '2-digit', day: '2-digit' });：这是一个返回语句，将格式化后的日期字符串作为函数的返回值。toLocaleDateString是Date对象的一个方法，用于将日期对象转换为本地化的日期字符串。

'zh'：这是作为第一个参数传递给toLocaleDateString方法的语言代码，表示使用中文格式化日期。
{ year: 'numeric', month: '2-digit', day: '2-digit' }：这是作为第二个参数传递给toLocaleDateString方法的选项对象，用于指定日期的格式。year: 'numeric'表示年份以数字形式显示，month: '2-digit'表示月份以两位数字形式显示，day: '2-digit'表示日期以两位数字形式显示。

*/


/**
 * @description 处理数字的方法
 */
export const handleWang = (number) => {
    return number / 10000;
}

/**
 * @description 滚动到顶部的方法
 */
export const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

/**
 * 
 * @param {min} min 
 * @param {max} max 
 * @description 这个是一个生成min和max之间的一个随机整数的方法
 * @returns min和max之间的随机整数
 */
export const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * @param {number} px
 * @description 这个方法用于将传入的像素值根据设备的像素比（devicePixelRatio）进行调整，从而实现在高DPI（高像素密度）
 * 屏幕上显示更加清晰的效果。在像素比大于1的设备上，通过这个方法可以将原始的像素值按比例放大，使得显示效果更加清晰。
 */
export function HiDpiPx(px) {
    return px * window.devicePixelRatio;
}

// 这个方法用于生成指定宽度和高度的图片链接。它接受图片的url、宽度和高度作为参数，
// 将宽度和高度作为参数附加到url中，并返回修改后的图片链接。这个方法可以用于在前端动态调整图片大小，
// 减少网络传输的数据量，提高页面加载速度。
/**
 * @param {string} url
 * @param {number} width
 * @param {number} height
 */
export function sizeImg(url, width, height = width) {
    if (!url) return '';
    if (process.env.NODE_ENV === 'development') {
        if (url.startsWith('http://localhost:')) {
            return url;
        }
    }
    if (url.startsWith('http:')) url = 'https' + url.slice(4);
    return `${url}?param=${width.toFixed(0)}y${height.toFixed(0)}`;
}
