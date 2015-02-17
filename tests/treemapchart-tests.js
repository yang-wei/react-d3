'use strict';

var expect = require('chai').expect;

describe('Treemap', function() {
  it('renders treemap', function() {
    var React = require('react/addons');
    var Treemap = require('../src/treemapchart').TreemapChart;
    var generate = require('../utils/datagen').generateArrayOfNumbers;
    var TestUtils = React.addons.TestUtils;

    // Render a treemap using array data
    var data = generate(5);
    var width = 500, height = 250;

    var treemap = TestUtils.renderIntoDocument(
      <Treemap data={data} width={width} height={height} /> 
    );

    // Verify that it has rendered the main chart svg
    var svg = TestUtils.findRenderedDOMComponentWithTag(treemap, 'svg');
    expect(svg).to.exist;
    
    // Verify that it has the same number of nodes as the array's length
    var cells = TestUtils.scryRenderedDOMComponentsWithTag(treemap, 'rect');

    // Note that the first node generated will always be the parent node 
    expect(Number(cells[0].getDOMNode().getAttribute('width'))).to.equal(width);

    // Magic number '1' is the parent node
    expect(cells.length).to.equal(data.length + 1);

    var labels = TestUtils.scryRenderedDOMComponentsWithTag(
      treemap, 'text');

    expect(labels[0].getDOMNode().textContent).to.be.empty;
    expect(labels.length).to.equal(data.length + 1);

  });
});
