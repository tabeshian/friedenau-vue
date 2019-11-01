const htmlTableToJson = require("html-table-to-json");
const axios = require("axios");

exports.handler = async (event, context) => {
    try {
        // SCRAPE DATA
        const html = await axios.get(
            "http://www.fussball.de/ajax.team.table/-/saison/1920/staffel/0277VGSSOG000006VS5489B4VTN21JC6-G/team-id/01SGTQ232S000000VS548984VVB63HJG"
        );
        // PARSE TO JSON
        const jsonTabelle = new htmlTableToJson(html.data)._results[0];
        // CREATE OUTPUT MODEL
        let tabelle = [];
        jsonTabelle.map(row => {
            const stats = {
                platz: row.Mannschaft,
                name: row["Sp.Spiele"],
                spiele: parseInt(row.G),
                siege: parseInt(row.U),
                unentschieden: parseInt(row.V),
                niederlagen: parseInt(row["Torv.Torverhältnis"]),
                punkte: parseInt(row["10"]),
                tore: parseInt(row["Tordifferenz"].split(" : ", 1)[0]),
                gegentore: parseInt(row["Tordifferenz"].split(" : ", 2)[1])
            };
            tabelle.push(stats);
        });
        return {
            statusCode: 200,
            body: JSON.stringify({
                tabelle
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: error.message
            })
        };
    }
};
