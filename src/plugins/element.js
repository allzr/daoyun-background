import Vue from 'vue'
import { Button } from 'element-ui'
import { Form, FormItem}from 'element-ui'
import {Input} from 'element-ui'
import {Message,Row,Col} from 'element-ui'
import {Container,Header,Aside,Main,Menu,Submenu,MenuItemGroup,
        MenuItem,Breadcrumb,BreadcrumbItem,Card,Table,TableColumn,
        Popover,Tooltip,Pagination,MessageBox,Dialog,Select,Option
        ,Checkbox,CheckboxGroup,Dropdown,DropdownItem,DropdownMenu} from 'element-ui'
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Popover)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
