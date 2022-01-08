import de from 'irregular-verbs-de'
import en from 'node-english-irregular-verbs'

const verbs = {
    de: {lang: "Deutsch", list: de},
    en: {lang: "English", list: Object.fromEntries(en.verbs.map((e) => {return [e.infinitive, {
                infinitive: e.infinitive, pastTense: e.past_simple, presentPerfect: e.past_participle}]}))}}

export default verbs;