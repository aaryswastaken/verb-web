import React from 'react'
import { setCookies, getCookie } from 'cookies-next';

import styles from '../styles/Home.module.css'
import popup from '../styles/Popup.module.css'

import Button from '../components/Button'
import FullHeight from "../components/FullHeight"
import Layout from "../components/Layout";
import {Popup, PButton} from "../components/Popup";

import verbs from '../lib/Verbs'

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {route: 0, languagePopupState: false, selectionPopupState: false,
            language: [null, null], selection: [[], []], availableLanguages: {}, availableVerbs: []}
    }

    componentDidMount() {
        console.log("useEffect")
        let c = getCookie("persistent");

        console.log(c);

        try {
            if (c !== undefined) {
                c = JSON.parse(c.toString());

                console.log("[!] Found some persistent data !");

                this.setState({language: [c[0], c[0]]});
                this.setState({selection: [c[1], c[1]]});

                console.log([this.state.language[0], this.state.selection[0]])
            }
        } catch (e) {
            console.log("Unable to retrieve saved cookies")
        }

        this.updateVerbs();
    }

    invokeLanguagePopup() {
        if (this.state.languagePopupState || this.state.selectionPopupState) {
            return;
        }

        this.setState({languagePopupState: true});
    }

    invokeSelectionPopup() {
        if (this.state.languagePopupState || this.state.selectionPopupState) {
            return;
        }

        this.setState({selectionPopupState: true});
    }

    // **** LANG SEL ****

    changeLanguage(lang) {
        this.setState({language: [lang, this.state.language[1]]})
    }

    cancelButtonLanguage() {
        this.setState({language: [this.state.language[1], this.state.language[1]]})

        this.exitPopups();
    }

    saveButtonLanguage() {
        this.setState({language: [this.state.language[0], this.state.language[0]]})

        this.exitPopups();
    }

    // **** Verb sel ****

    handleSelectionEvent(index, checked) {
        console.log(`${index} : ${checked}`);
        let newSel = Array.from(this.state.selection[0]); // Deference it

        if (newSel.includes(index) && !checked) { // If present in list and checked
            console.log(`[-] ${index}`)
            newSel = newSel.filter((i) => i !== index);
        }

        if (!newSel.includes(index) && checked) {
            console.log(`[+] ${index}`)
            newSel.push(index);
        }

        console.log(newSel)

        this.setState({selection: [newSel, this.state.selection[1]]})
        console.log(`[%] ${JSON.stringify(this.state.selection)}`)
    }

    cancelButtonSelection() {
        this.setState({selection: Array.from([this.state.selection[1], this.state.selection[1]])})
        console.log(`[<] ${JSON.stringify(this.state.selection[1])}`)

        this.exitPopups();
    }

    saveButtonSelection() {
        this.setState({selection: Array.from([this.state.selection[0], this.state.selection[0]])})
        console.log(`[>] ${JSON.stringify(this.state.selection[0])}`)

        this.exitPopups();
    }

    exitPopups() {
        this.setState({languagePopupState: false, selectionPopupState: false});
    }

    // Cookie handling

    validateChoice(lang, sel) {
        setCookies("persistent", JSON.stringify([lang, sel]))
    }

    resetCookie() {
        setCookies("persistent", "")
    }

    updateVerbs() {
        this.setState({
            availableLanguages: Object.fromEntries(Object.entries(verbs)
                .map(([k, v]) => {return [k, v.lang]})),
            availableVerbs: (Object.keys(verbs).includes(this.state.language[0]) ? Object.entries(verbs[this.state.language[0]].list).map(([k, v]) => {
                return `${v.infinitive} / ${v.pastTense} / ${v.presentPerfect}`;
            }):["An error occurred please contact the web admin"])})
    }

    render() {
        if (this.state.route === 0) {
            return (
                <div className={styles.mainCont}>
                    <div className={styles.titleBox}>
                        <div> Verb</div>
                        <div/>
                        <div> Web edition</div>
                    </div>
                    <div className={styles.centeredElements}>
                        <Button text={"Start"} subtext={"From scratch"} onclick={() => {
                            this.resetCookie();
                            this.setState({route: 1})
                        }}/>
                        <Button text={"Continue"} subtext={"From the last series"}
                                onclick={() => {
                                    this.setState({route: 2})
                                }} grayed={this.state.selection[0].length === 0 || this.state.language[0] === null}/>
                    </div>
                    <FullHeight/>
                </div>
            )
        } else if (this.state.route === 1) {
            return (
                <>
                    {this.state.languagePopupState ?
                        <Popup>
                            {/*<div> <button className={`${styles.freeButton} ${popup.exit}`}> X </button> </div>*/}
                            <div className={popup.alignV}>
                                <div>
                                    <div className={popup.sectionHeader}>Supported Language</div>
                                    <div className={popup.line20}/>
                                    <div>
                                        <div className={popup.list}>
                                            {Object.entries(this.state.availableLanguages).map(([key, val]) => {
                                                return (
                                                    <button key={key.toString()}
                                                            onClick={() => {
                                                                this.changeLanguage(key)
                                                            }}
                                                            className={(this.state.language[0] === key) ? (popup.selected) : (popup.none)}>{val}</button>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className={popup.rightButtonValign}>
                                    <PButton text={"Cancel"} onClick={() => {this.cancelButtonLanguage()}}/>
                                    <PButton text={"Validate"} grayed={this.state.language[0] === null}
                                             onClick={() => {this.saveButtonLanguage();this.updateVerbs()}}/>
                                </div>
                            </div>
                        </Popup>
                        : <></>}

                    {this.state.selectionPopupState ?
                        <Popup>
                            <div className={popup.alignV}>
                                <div className={popup.scroll}>
                                    <div className={popup.sectionHeader}>Verb list</div>
                                    <div className={popup.line20}/>
                                    <div>
                                        <div className={popup.list}>
                                            {
                                                Array.from(Object.entries(this.state.availableVerbs)).map(([index, val]) => {
                                                    return (
                                                        <div key={index} className={popup.inlineElement}>
                                                            <input type={"checkbox"}
                                                                   onChange={(e) => {
                                                                       let checked = e.target.checked;
                                                                       this.handleSelectionEvent(index, checked);
                                                                   }} checked={this.state.selection[0].includes(index)}/>
                                                            <div> {val} </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={popup.rightButtonValign}>
                                    <PButton text={"Cancel"} onClick={() => {this.cancelButtonSelection()}}/>
                                    <PButton text={"Validate"}
                                             grayed={this.state.selection[0].length === 0}
                                             onClick={() => {this.saveButtonSelection()}}/>
                                </div>
                            </div>
                        </Popup>
                        : <></>
                    }

                    <Layout backFunction={() => this.setState({route: 0})}>
                        <div className={styles.startCont}>
                            <div className={`${styles.centeredElements} ${styles.topSelector}`}
                                 style={{marginBottom: "15em"}}>
                                <Button text={"Language"} onclick={() => {this.invokeLanguagePopup()}}/>
                                <Button text={"Selection"} onclick={() => {this.invokeSelectionPopup()}}/>
                            </div>
                            <div className={styles.centeredElements} style={{marginTop: "5em"}}>
                                <Button text={"Start"}
                                        grayed={(this.state.language[0] === null || this.state.selection[0].length === 0)}
                                        onclick={() => {
                                            this.validateChoice(this.state.language[0].toString(), Array.from(this.state.selection[0]))
                                        }}/>
                            </div>
                        </div>
                        <FullHeight/>
                    </Layout>
                </>
            )
        } else if (this.state.route === 2) {
            return (
                <div>
                    {this.state.language[0]} {this.state.selection[0]}
                </div>
            )
        }
    }
}