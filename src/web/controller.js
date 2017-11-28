const model = require('./model');
const view = require('./view');

module.exports = {
    exec(req, res) {
        const data = model.getData();
        const page = this.render(view, data)
        res.write(page);    
        res.end();
    },
    render(v, data) {
        return v.getTpl().replace("{{name}}", data);
    }
}