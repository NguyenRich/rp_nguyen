/* Fetch acidic pH data and display via Chart.JS 
pH values are differences from the initial pH on day 0 with Polysiphonia. */

async function getData() {
    const response = await fetch('../data/acidic-ph.csv'); //.. moves up 1 folder
    const data = await response.text(); // CSV in text format
    // console.log(data);

    const xDays = [];     // x-axis labels
    const yZero = [];     // y-axis without Polysiphonia
    const yOne = [];     // y-axis with 1 mL Polysiphonia
    const yTwo = [];     // y-axis with 2 mL Polysiphonia

    // \n - new line character
    // split('\n') - separate the table into an array of individual rows
    // slice(start, end) - return a new array starting at index start up to but not including end
    const table = data.split('\n').slice(1);
    // console.log(table);

    table.forEach(row => {
        const columns = row.split(','); // split row into columns using comma
        const days = parseFloat(columns[0]);    // assign year value
        xDays.push(days)                       // push year values into xYears array

        const zero = parseFloat(columns[1]);
        yZero.push(zero);

        const one = parseFloat(columns[2]);
        yOne.push(one);

        const two = parseFloat(columns[3]);
        yTwo.push(two);

        // console.log(year, temp, nhTemp, shTemp);
    })

    return { xDays, yZero, yOne, yTwo };   // return multiple values as an object

}

async function createChart() {
    const data = await getData();       // wait for getData() to send formatted data to createChart()
    const lineChart = document.getElementById('line-chart');

    const myChart = new Chart(lineChart, {
        type: 'line',
        data: {
            labels: data.xDays,    // x-axis labels
            datasets: [
                {
                    label: 'Change in Acidic Seawater pH Over Time Without Presence of Polysiphonia',
                    data: data.yZero,
                    fill: false,
                    backgroundColor: 'rgba(255, 0, 132, 0.2)',
                    borderColor: 'rgba(255, 0, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Change in Acidic Seawater pH Over Time With 1mL of Polysiphonia',
                    data: data.yOne,
                    fill: false,
                    backgroundColor: 'rgba(0, 102, 255, 0.2)',
                    borderColor: 'rgba(0, 102, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Change in Acidic Seawater pH Over Time With 2mL of Polysiphonia',
                    data: data.yTwo,
                    fill: false,
                    backgroundColor: 'rgba(0, 153, 51, 0.2)',
                    borderColor: 'rgba(0, 153, 51, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,       // re-size based on screen size
            maintainAspectRatio: false,
            scales: {                   // display options for x & y axes
                x: {
                    title: {
                        display: true,
                        text: 'Days',   // x-axis title
                        font: {         // font properties
                            size: 14
                        }
                    },
                    ticks: {
                        font: {
                            size: 14
                        }
                    },
                    grid: {
                        color: '#6c767e'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Change in pH',  // y-axis title
                        font: {                     // font properties
                            size: 14
                        }
                    },
                    ticks: {
                        font: {
                            size: 14
                        }
                    },
                    grid: {
                        color: '#6c767e'
                    }
                }
            },
            plugins: {      // Display options for title and legend
                title: {
                    display: true,      // display chart title
                    text: 'Average Change in Acidic Seawater pH from Day 0 Based on Presence of Polysiphonia',
                    font: {
                        size: 24
                    },
                    color: '#black',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    align: 'start',
                    position: 'bottom',
                }
            }
        }
    })
}

createChart();