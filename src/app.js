import './shared/styles/global.css'
import { ContextMenu } from './menu/menu'

import MessageModule from './modules/message/message.module'

import { SnowModule } from './modules/snowflakes/snowFlakes.module'
import { BackgroundModule } from './modules/randomBackgroundColor/background.module'
import { TimerModule } from './modules/timer/timer.module'

import { ClicksModule } from './modules/clickCount/clicks.module'

import { ShapeModule } from './modules/randomShape/shape.module'
import { SoundModule } from './modules/randomSound/sound.module'

const menu = new ContextMenu('.menu')

menu.add(new MessageModule('message', 'Вызывать сообщение'))

menu.add(new ClicksModule('Считать клики'))

menu.add(new SnowModule())
menu.add(new BackgroundModule())
menu.add(new TimerModule())

menu.add(new ShapeModule())
menu.add(new SoundModule())