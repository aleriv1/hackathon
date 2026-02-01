import { Module } from "../../core/module";
import styles from './sound.module.css'

// const TRACKS = [
//     { id: 1, author: "ANNA_ASTI", name: "По барам", src: "../assets/audio/ANNA_ASTI_Po_baram.mp3" },
//     { id: 2, author: "Кравц и Гио Пика", name: "Где прошла ты", src: "../assets/audio/Kravc_Gio_Pika_Gde_proshla_ty.mp3" },
//     { id: 2, author: "Ваня Дмитриенко", name: "Шёлк", src: "../assets/audio/Ваня_Дмитриенко_Шёлк.mp3" }
// ];



const BASE =
    window.location.hostname === 'localhost'
        ? ''
        : '/hackathon';


const TRACKS = [
    {
        id: 1,
        author: "ANNA_ASTI",
        name: "По барам",
        src: `${BASE}/audio/ANNA_ASTI_Po_baram.mp3`
    },
    {
        id: 2,
        author: "Кравц и Гио Пика",
        name: "Где прошла ты",
        src: `${BASE}/audio/Kravc_Gio_Pika_Gde_proshla_ty.mp3`
    },
    {
        id: 3,
        author: "Ваня Дмитриенко",
        name: "Шёлк",
        src: `${BASE}/audio/Ваня_Дмитриенко_Шёлк.mp3`
    }
];

class Engine {
    constructor() {
        this.ctx = new AudioContext();

        this.audio = new Audio();
        this.source = this.ctx.createMediaElementSource(this.audio);

        this.gain = this.ctx.createGain();
        this.panner = this.ctx.createStereoPanner();

        this.source
            .connect(this.panner)
            .connect(this.gain)
            .connect(this.ctx.destination);

        this.currentSrc = null;
        this.isPlaying = false;
    }

    async toggle(src) {
        await this.ctx.resume();

        // если клик по тому же треку
        if (this.currentSrc === src) {
            if (this.isPlaying) {
                this.audio.pause();
                this.isPlaying = false;
            } else {
                this.audio.play();
                this.isPlaying = true;
            }
            return;
        }

        // если выбран новый трек
        this.currentSrc = src;
        this.audio.src = src;
        await this.audio.play();
        this.isPlaying = true;
    }

    stop() {
        this.audio.pause();

        this.isPlaying = false;
        this.currentSrc = null;
    }

    setVolume(value) {
        this.gain.gain.value = value;
    }

    setPan(value) {
        this.panner.pan.value = value;
    }
}

class TrackItem {
    constructor(track, engine) {
        this.track = track;
        this.engine = engine;
        this.expanded = false;

        this.container = document.createElement("div");
        this.container.className = styles['container-audio'];

        this.header = document.createElement("div");
        this.header.className = styles['container-audio_header'];
        this.header.onclick = () => this.toggle();

        this.name_audio = document.createElement("span");
        this.name_audio.textContent = track.name;

        this.author = document.createElement("span");
        this.author.textContent = track.author;

        this.header.append(this.name_audio, this.author);

        this.panel = document.createElement("div");
        this.panel.className = styles['panel'];
        this.panel.style.display = "none";

        this.buildPanel();

        this.container.append(this.header, this.panel);
    }

    buildPanel() {
        const play = document.createElement("button");
        play.textContent = "▶ / ⏸";
        play.onclick = () => this.engine.toggle(this.track.src);;

        const volume = document.createElement("input");
        volume.type = "range";
        volume.min = 0;
        volume.max = 1;
        volume.step = 0.01;
        volume.value = 0.8;
        volume.oninput = e =>
            this.engine.setVolume(e.target.value);

        const pan = document.createElement("input");
        pan.type = "range";
        pan.min = -1;
        pan.max = 1;
        pan.step = 0.01;
        pan.value = 0;
        pan.oninput = e =>
            this.engine.setPan(e.target.value);

        this.panel.append(play, volume, pan);
    }

    toggle() {
        this.expanded = !this.expanded;
        this.panel.style.display = this.expanded ? "block" : "none";
    }
}

export class SoundModule extends Module {
    constructor() {
        super("sound", "случайный звук")
        this.engine = new Engine()
        this.container = document.createElement("div");
        this.container.className = styles['sound-module'];

        const close = document.createElement("button");
        close.className = styles['sound-module__close'];
        close.textContent = "✕";
        close.onclick = () => {
            this.engine.stop();
            this.container.remove();
        };

        this.container.appendChild(close);

        TRACKS.forEach(track => {
            const item = new TrackItem(track, this.engine)
            this.container.appendChild(item.container)
        })
    }

    trigger() {
        document.body.appendChild(this.container)
        const randomTrack =
            TRACKS[Math.floor(Math.random() * TRACKS.length)];

        this.engine.toggle(randomTrack.src);
    }
}