const flow = {
    question: 'You are a farmer in Rajasthan and get bitten by a snake while working on the fields. Where do you want to seek treatment?',
    options: [
        {name:'Snake Stone', result: 'You die a horrible death.', options: [], time: 120, die: 'Y'},
        {name:'Temple', result: 'Sorry, prayers could not save you. You die a painful death.', options: [], time: 120, die: 'Y'},
        {name:'Local healer', result: "It cost you a month's income, and you still did not survive.", options: [], time: 180, die: 'Y'},
        {name:'Nearest Primary Health Centre', result: 'They are out of antivenoms. You are referred to a local hospital. Do you want to go to the local hospital?',time: 60, options: [
            {name:'Yes', result: "They give you 10 vials of antivenom. But it is not working and your condition worsens. You are referred to a snakebite speciality hospital. Do you want to go there?", options: [
                {name:'No', result: 'You are dead', options: [], die: 'Y'},
                {name:'Yes', time: 60, result: 'The doctor at the speciality hospital wants to administer more antivenom. They give you 10 vials but your condition is not improving. The doctor suggests more antivenom. How many vials do you want to get?', options: [
                    {name:'10', result: 'You die because the antivenom is ineffective. It was made using venom from a snake in Tamil Nadu.',die: 'Y',  options: []},
                    {name:'30', result: 'You survive but you now suffering from serum sickness. If you get bitten again, taking the antivenom again could be lethal.', options: [], time: 30},
                    {name:'50', die: 'Y', result: 'You die of anaphylaxis because Indian antivenom technology is outdated.', options: [], time: 30 },
                ]},
            ], time: 120},
            {name:'No', result: 'You die', die: 'Y', options: []},
        ]}, 
        {name:'Nearest hospital', result: "They give you 10 vials of antivenom. But it is not working and your condition worsens. You are referred to a snakebite speciality hospital. Do you want to go there?", options: [
            {name:'No', result: 'You are dead', options: [], die: 'Y'},
            {name:'Yes', time: 120, result: 'The doctor at the speciality hospital wants to administer more antivenom. They give you 10 vials but your condition is not improving. The doctor suggests more antivenom. How many vials do you want to get?', options: [
                {name:'10', result: 'You die because the antivenom is ineffective. It was made using venom from a snake in Tamil Nadu.',die: 'Y',  options: []},
                    {name:'30', result: 'You survive but you now suffering from serum sickness. If you get bitten again, taking the antivenom again could be lethal.', options: [], time: 30},
                    {name:'50', die: 'Y', result: 'You die of anaphylaxis because Indian antivenom technology is outdated.', options: [], time: 30 },
            ]},
        ], time: 120},
        {name:'Govt snakebite hospital', time: 120,result: 'They are out of antivenom. Treatment at the private hospital might cost more than two lakhs. Do you want to go a private hospital instead?', options: [
            {name:'Yes', time: 120, result: 'The doctor at the speciality hospital wants to administer more antivenom. They give you 10 vials, but your condition is not improving. The doctor wants to give more antivenom. How many vials do you want to get?', options: [
                {name:'10', result: 'You die because the antivenom is ineffective. It was made using venom from a snake in Tamil Nadu.',die: 'Y',  options: []},
                    {name:'30', result: 'You survive but you now suffering from serum sickness. If you get bitten again, taking the antivenom again could be lethal.', options: [], time: 30},
                    {name:'50', die: 'Y', result: 'You die of anaphylaxis because Indian antivenom technology is outdated.', options: [], time: 30 },
            ]},
            {name:"No. I can't afford it.", die: 'Y', result: 'You die', options: []},
        ]},
        {time: 120, name:'Private snakebite hospital',result: 'The doctor at the speciality hospital wants to administer more antivenom. They give you 10 vials, but your condition is not improving. The doctor wants to give more antivenom. How many vials do you want to get?', options: [
            {name:'10', result: 'You die because the antivenom is ineffective. It was made using venom from a snake in Tamil Nadu.',die: 'Y',  options: []},
                    {name:'30', result: 'You survive but you now suffering from serum sickness. If you get bitten again, taking the antivenom again could be lethal.', options: [], time: 30},
                    {name:'50', die: 'Y', result: 'You die of anaphylaxis because Indian antivenom technology is outdated.', options: [], time: 30 },
        ]},
    ]
}

d3.select('#app .text').text(flow.question)
let timer = 360
d3.select('.options').selectAll('.opt').data(flow.options)
.enter().append('div').attr('class','opt').text(d=>d.name)

let selected
d3.select('.timer').text(timer)
d3.selectAll('.opt').on('click', function(d, e){
    selected = e
    d3.select('.text').text(selected.result)
    d3.selectAll('.opt').remove()
    d3.select('.options').selectAll('.opt').data(selected.options)
.enter().append('div').attr('class','opt').text(d=>d.name)
    run()
})

function run(){
    d3.selectAll('.opt').on('click', function(d, e){
        selected = e
        d3.select('.text').text(selected.result)
        d3.selectAll('.opt').remove()
        d3.select('.options').selectAll('.opt').data(selected.options)
    .enter().append('div').attr('class','opt').text(d=>d.name)
    
    })
    
}

document.body.addEventListener( 'click', function ( event ) {
    if( d3.select(event.target).attr('class') == 'opt' ) {
      run()
        console.log(selected)
      timer = timer-selected.time
      console.log(timer)
        d3.select('.timer').text(timer)
        if (selected.die === 'Y' || selected.options.length==0){
            d3.select('.timer-main').classed('hide', true)
        }
        if (timer<0){
            d3.select('.text').text("You didn't get the treatment on time. You died a painful death. ")
            d3.selectAll('.opt').remove()
            d3.select('.timer-main').classed('hide', true)
        }
    };
});