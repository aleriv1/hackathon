import './styles.css'
import { ContextMenu } from './menu'
import MessageModule from './modules/message/message.module'
import { SnowModule } from './modules/snowFlakes.module'
import { ClicksModule } from './modules/clicks.module'
import { BackgroundModule } from './modules/background.module'
import { ShapeModule } from './modules/shape.module'

const menu = new ContextMenu('.menu')

menu.add(new MessageModule('message', 'Вызывать сообщение'))

menu.add(new ClicksModule('Считать клики'))

menu.add(new SnowModule())
menu.add(new BackgroundModule())

menu.add(new ShapeModule())