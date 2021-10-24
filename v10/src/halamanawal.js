import { Component, App } from '../lib/Core.js';
import { Layout, Header, ScrollView, Button } from '../components/material.js';

export default class HalamanAwal extends Component {
	
	constructor(n) {
		super(n);
	}

	regComponents() {
		return ({
			Layout, Header, ScrollView, Button
		});
	}

	view() {
		return (`
            <Layout>
                <Header></Header>
                <ScrollView>
                    <Button id="cok1">1. Pergilah Kasih - Chrisye</Button>
                </ScrollView>
			</Layout>
		`);
	}

	render(view) {
        var b = view.bundle;
        var cok1 = b.Button.ID.cok1;
        cok1.click(() => {
            App.navigate('chord', {
                judul: 'Pergilah Kasih'
            });
        });
	}

}
	