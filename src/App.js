import logo from './logo.svg';
import './App.css';
import BarChart from './components/BarChart';
import * as d3 from 'd3';
import React from 'react';
import ScatterPlot from './components/ScatterPlot';


function App() {

    // Create three states, i.e., data, selectedData, and filterCategory
    const [data, setData] = React.useState([]);
    const [selectedData, setSelectedData] = React.useState([]);
    const [filterCategory, setFilterCategory] = React.useState([]);

    const colorScale = d3.scaleOrdinal()
        .range(['#d3eecd', '#7bc77e', '#2a8d46']) 
        .domain(['Easy','Intermediate','Difficult']);

    React.useEffect(()=>{
        loadData();
    },[])
    
    const loadData = () => {
        d3.csv('./vancouver_trails.csv') 
        .then(_data => {
            setData(_data.map(d => {
                d.time = +d.time;
                d.distance = +d.distance;
                return d
            }));
        })
    }
    
    // Use useEffect to render and update visual results when dependency/dependencies change (30pts)
    React.useEffect(() => {
        let selected;
        if (filterCategory.length === 0) {
            selected = data;
        }
        else selected = data.filter(d => filterCategory.includes(d.difficulty));
        setSelectedData(selected);
    }, [data, filterCategory]);

    return (
        <div className='Container'>
        <h1 className='head'> Multiple-View Interaction </h1>
        <div className="App">
        <ScatterPlot config={colorScale} data = {selectedData}/>
        <BarChart config={colorScale} data = {data} setFilterCategory={setFilterCategory}/>
        </div>
        </div>
    );
}

export default App;
