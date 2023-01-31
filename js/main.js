let app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        image: "./assets/vmSocks-green-onWhite.jpg",
        altText: "A pair of socks",
        link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
        inStock: true,
        inventory: 0,
        onSale: true,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: "./assets/vmSocks-green-onWhite.jpg",
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: "./assets/vmSocks-blue-onWhite.jpg",
            }
        ],

        sizes: [
            {
                sizeId: 2236,
                variantSize: 'S',
            },
            {
                sizeId: 2237,
                variantSize: 'M',
            },
            {
                sizeId: 2238,
                variantSize: 'L',
            },
            {
                sizeId: 2239,
                variantSize: 'XL',
            },
            {
                sizeId: 2240,
                variantSize: 'XXL',
            }],
        cart: 0,
        updateProduct(variantImage) {
            this.image = variantImage
        },
        },


})
