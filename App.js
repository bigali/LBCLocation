/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import cheerio from "cheerio-without-node-native";
import axios from 'axios'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
function loadGraphicCards(page = 1) {
    const searchUrl = `https://www.amazon.fr/s/?page=${page}&keywords=graphic+card`;
    axios.get(searchUrl)
        .then((response) => {
            if (response.status === 200) {
                const htmlString = response.data;
                const $ = cheerio.load(htmlString);       // parse HTML string

                const items =  $("#s-results-list-atf")             // select result <li>s
                console.log("items", items)
                // Get HTML
                //console.log($.html());
            }
        })
        .catch((err) => {
            throw new Error(err);
        });

}
export default class App extends Component<Props> {
    state = {
        page: 0,
        items: [],
    };

    componentDidMount = () => this.loadNextPage();

    loadNextPage = () =>
        this.setState(async state => {
            const page = state.page + 1;
            const items = await loadGraphicCards(page);
            console.log("items", items)

            return {items, page};
        });



    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.instructions}>To get started, edit App.js</Text>
                <Text style={styles.instructions}>{instructions}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
