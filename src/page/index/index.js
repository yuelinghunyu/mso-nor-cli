import '#/css/reset.css'
import './index.scss'
import "@babel/polyfill"
import $ from 'zepto'
import Header from '@/component/header/header.handlebars'
$("#app").append(Header({
    title: 'mso 编译模板展示内容'
}))
$(".app-btn").on("click", () => {
    window.location.href = window.origin + '/page1.html'
})
