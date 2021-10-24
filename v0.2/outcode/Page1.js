class Page1 extends Page {
	
	constructor(main, state) {
		super(main);
		console.log(main.params);
		this.warn('page1')
	}

	view() {
		return `
			<header>
				<title>Page 1</title>
			</header>
			<content>
				<p id="text"></p>
				<div>Kartu penerimaan barang merupakan buku tambahan untuk perkiraan perlengkapan. Buku ini digunakan untuk mencatat penambahan, pengurangan dan saldo akhir dari setiap jenis barang perlengkapan.
Setiap transaksi penambahan dan pembelian barang perlengkapan harus di catat, baik di kartu persediaan maupun di buku besar perlengkapan. Apabila suatu kantor membutuhkan barang untuk keperluan kantor, maka perlu dibuatkan daftar kebutuhan barang secara terperinci oleh pejabat/pegawai yang berwenang untuk hal itu. Setelah barang dipesan diterima dan dicatat dalam buku penerimaan barang, dibuatkan berita acaranya oleh pejabat/pegawai yang bertanggungjawab atas penerimaan barang.
Contoh kartu/buku penerimaan barang Kartu penerimaan barang merupakan buku tambahan untuk perkiraan perlengkapan. Buku ini digunakan untuk mencatat penambahan, pengurangan dan saldo akhir dari setiap jenis barang perlengkapan.
Setiap transaksi penambahan dan pembelian barang perlengkapan harus di catat, baik di kartu persediaan maupun di buku besar perlengkapan. Apabila suatu kantor membutuhkan barang untuk keperluan kantor, maka perlu dibuatkan daftar kebutuhan barang secara terperinci oleh pejabat/pegawai yang berwenang untuk hal itu. Setelah barang dipesan diterima dan dicatat dalam buku penerimaan barang, dibuatkan berita acaranya oleh pejabat/pegawai yang bertanggungjawab atas penerimaan barang.
Contoh kartu/buku penerimaan barang
 Kartu penerimaan barang merupakan buku tambahan untuk perkiraan perlengkapan. Buku ini digunakan untuk mencatat penambahan, pengurangan dan saldo akhir dari setiap jenis barang perlengkapan.
Setiap transaksi penambahan dan pembelian barang perlengkapan harus di catat, baik di kartu persediaan maupun di buku besar perlengkapan. Apabila suatu kantor membutuhkan barang untuk keperluan kantor, maka perlu dibuatkan daftar kebutuhan barang secara terperinci oleh pejabat/pegawai yang berwenang untuk hal itu. Setelah barang dipesan diterima dan dicatat dalam buku penerimaan barang, dibuatkan berita acaranya oleh pejabat/pegawai yang bertanggungjawab atas penerimaan barang.
Contoh kartu/buku penerimaan barang
 Kartu penerimaan barang merupakan buku tambahan untuk perkiraan perlengkapan. Buku ini digunakan untuk mencatat penambahan, pengurangan dan saldo akhir dari setiap jenis barang perlengkapan.
Setiap transaksi penambahan dan pembelian barang perlengkapan harus di catat, baik di kartu persediaan maupun di buku besar perlengkapan. Apabila suatu kantor membutuhkan barang untuk keperluan kantor, maka perlu dibuatkan daftar kebutuhan barang secara terperinci oleh pejabat/pegawai yang berwenang untuk hal itu. Setelah barang dipesan diterima dan dicatat dalam buku penerimaan barang, dibuatkan berita acaranya oleh pejabat/pegawai yang bertanggungjawab atas penerimaan barang.
Contoh kartu/buku penerimaan barang
Kartu penerimaan barang merupakan buku tambahan untuk perkiraan perlengkapan. Buku ini digunakan untuk mencatat penambahan, pengurangan dan saldo akhir dari setiap jenis barang perlengkapan.
Setiap transaksi penambahan dan pembelian barang perlengkapan harus di catat, baik di kartu persediaan maupun di buku besar perlengkapan. Apabila suatu kantor membutuhkan barang untuk keperluan kantor, maka perlu dibuatkan daftar kebutuhan barang secara terperinci oleh pejabat/pegawai yang berwenang untuk hal itu. Setelah barang dipesan diterima dan dicatat dalam buku penerimaan barang, dibuatkan berita acaranya oleh pejabat/pegawai yang bertanggungjawab atas penerimaan barang.
Contoh kartu/buku penerimaan barang
Kartu penerimaan barang merupakan buku tambahan untuk perkiraan perlengkapan. Buku ini digunakan untuk mencatat penambahan, pengurangan dan saldo akhir dari setiap jenis barang perlengkapan.
Setiap transaksi penambahan dan pembelian barang perlengkapan harus di catat, baik di kartu persediaan maupun di buku besar perlengkapan. Apabila suatu kantor membutuhkan barang untuk keperluan kantor, maka perlu dibuatkan daftar kebutuhan barang secara terperinci oleh pejabat/pegawai yang berwenang untuk hal itu. Setelah barang dipesan diterima dan dicatat dalam buku penerimaan barang, dibuatkan berita acaranya oleh pejabat/pegawai yang bertanggungjawab atas penerimaan barang.
Contoh kartu/buku penerimaan barang

</div>
				<input type="text" id="input">
				<button onclick="that.ke('home')">HOME</button>
				<button onclick="that.ke('page2')">PAGE 2</button>
			</content>
		`;
	}

	style(css) {
		css('header', 'background-color:#204fce;');
		css('header title', 'color:#fff;');
	}

	onCreate(init){
		this.p = new Text("#text");
		this.p.setText("A");
	}

	ke(h, p = {}) {
		navigate(h, p);
	}
}