import '#/css/reset.css'
import './index.css'
import "@babel/polyfill"
import $ from 'zepto'
import Header from '@/component/header/header.handlebars'

$("#app").append(Header({
    title: 'mso 编译模板'
}))
$(".app-btn").on("click", () => {
    window.location.href = window.origin + '/page1.html'
})
