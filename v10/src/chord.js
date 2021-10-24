import { Component, App } from '../lib/core.js';
import { Layout, Header, ScrollView, Button, BarisLirik } from '../components/material.js';

export default class Chord extends Component {
	
	constructor(n) {
		super(n);
	}

	regComponents() {
		return ({
			Layout, Header, ScrollView, Button, BarisLirik
		});
	}

	view() {
		return (`
            <Layout>
                <Header id="ndas1"></Header>
                <ScrollView>
                    <BarisLirik chord="[{0:C},{10:F}]">Tak pernah kusangka ini terjadi</BarisLirik>
                    <div>C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;F</div>
                    <div>Tak pernah kusangka ini terjadi</div>

                    <div style="padding:5px"></div>
                    <div>G&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;C</div>
                    <div>Kisah cinta yang sesuci ini</div>

                    <div style="padding:5px"></div>
                    <div>Am&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;Dm</div>
                    <div>Kau tinggalkan begitu saja</div>

                    <div style="padding:5px"></div>
                    <div>F&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;G</div>
                    <div>Sekian lama kita berdua</div>

                    <div style="padding:5px"></div>
                    <div>C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;F</div>
                    <div>Tak kusangka cepat berlalu</div>

                    <div style="padding:5px"></div>
                    <div>G&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;C</div>
                    <div>Tuk mencari kesombongan diri</div>

                    <div style="padding:5px"></div>
                    <div>Am&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dm</div>
                    <div>Lepas segala yang pernah kau ucapkan</div>

                    <div style="padding:5px"></div>
                    <div>F&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;G</div>
                    <div>Kau tinggalkan daku</div>
                </ScrollView>
			</Layout>
		`);
	}

	render(view) {
        var b = view.bundle;
        this.ndas1 = b.Header.ID.ndas1;
    }
    
    widgetReady(data) {
        this.ndas1.setTitle(data.judul);
    }

}
	