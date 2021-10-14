import React, { Component} from 'react';

class App extends Component {

    constructor(){
        super();
        this.state = {
            company: '',
            ticker: '',
            stockPrice:'',
            timeElapsed:'',
            _id:'',
            products: []
        };
        this.addProduct = this.addProduct.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    addProduct(e){
        if(this.state._id){
            fetch(`/api/products/${this.state._id}`,{
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                M.toast({html: 'Product updated'})
                this.setState({company: '', ticker: '', stockPrice: '', timeElapsed: '', _id: ''})
                this.fetchProduct()
            })
        }else{
            fetch('/api/products',{
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({html: 'Product saved'})
                    this.setState({company:'', ticker:'', stockPrice:'', timeElapsed:''})
                    this.fetchProduct();
                })
                .catch(err => console.log('err: ',err))
        }

        e.preventDefault();
    }

    componentDidMount(){
        this.fetchProduct()
    }

    fetchProduct(){
        fetch('/api/products')
        .then(res => res.json())
        .then(data => {
            this.setState({products: data})
        })
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]:value
        })
    }

    deleteProduct(id){
        if (confirm('Are you sure you want to delete it')){
            fetch(`/api/products/${id}`,{
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                M.toast({html: 'Product deleted'})
                this.fetchProduct();
            })
        }
       
    }

    editProduct(id){
        fetch(`/api/products/${id}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                company: data.company,
                ticker: data.ticker,
                stockPrice: data.stockPrice,
                timeElapsed: data.timeElapsed,
                _id: data._id
            })
        })
    }

    render(){
        return(
            <div>
                {/* NAVIGATION */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addProduct}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="company" value={this.state.company} onChange={this.handleChange} type="text" placeholder="company"></input>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="ticker" value={this.state.ticker} onChange={this.handleChange} className="materialize-textarea" placeholder="ticker"></textarea>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="stockPrice" value={this.state.stockPrice} onChange={this.handleChange} className="materialize-textarea" placeholder="stockPrice"></textarea>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="timeElapsed" value={this.state.timeElapsed} onChange={this.handleChange} className="materialize-textarea" placeholder="timeElapsed"></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Company</th>
                                        <th>Ticker</th>
                                        <th>StockPrice</th>
                                        <th>TimeElapsed</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.products.map(product =>{
                                            return(
                                                <tr key={product._id}>
                                                    <td>{product.company}</td>
                                                    <td>{product.ticker}</td>
                                                    <td>{product.stockPrice}</td>
                                                    <td>{product.timeElapsed}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" onClick={() => this.editProduct(product._id)}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                        <button className="btn light-blue darken-4" onClick={() => this.deleteProduct(product._id)} style={{margin: '4px'}}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;