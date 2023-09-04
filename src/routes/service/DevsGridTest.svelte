<script>
    import Header from "../../components/service/layout/Header.svelte";
    import '../../lib/AUIGrid/AUIGrid.js';
    import '../../lib/AUIGrid/AUIGridLicense.js';
    import '../../lib/AUIGrid/AUIGrid_style.css';
    import {onMount} from "svelte";

    onMount(() => {
        var columnLayout = [ {

            dataField : "name",

            headerText : "Name",

            width : 140

        }, {

            dataField : "country",

            headerText : "Country",

            width : 120



        }, {

            dataField : "product",

            headerText : "Product",

            width: 120

        }, {

            dataField : "quantity",

            headerText : "Quantity"

        }, {

            dataField : "price",

            headerText : "Price",

            dataType : "numeric"

        }, {

            dataField : "date",

            headerText : "Date"

        }

        ];
        let myGridID = AUIGrid.create("#basicGridDiv", columnLayout);

        const data = [{

            "id": "#Cust0",

            "date": "2014-10-01",

            "name": "Steve",

            "country": "USA",

            "flag": "usa.png",

            "product": "IPad Air",

            "color": "Green",

            "quantity": 3,

            "price": 630700

        }, {

            "id": "#Cust1",

            "date": "2014-09-30",

            "name": "Emma",

            "country": "Korea",

            "flag": "korea.png",

            "product": "LG G3",

            "color": "Pink",

            "quantity": 1,

            "price": 503800

        }, {

            "id": "#Cust2",

            "date": "2014-09-29",

            "name": "Emma",

            "country": "Japan",

            "flag": "japan.png",

            "product": "IPad Air",

            "color": "Yellow",

            "quantity": 7,

            "price": 66900

        }];

        AUIGrid.setGridData('#basicGridDiv', data);
    });
</script>

<Header />

<section class="bodyWrap">
    <div id="basicGridDiv"></div>
</section>>