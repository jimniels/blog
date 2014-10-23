

## Javascript IF: One Variable to Multiple Values

Often times I need to run an `if` statement in javascript which checks a single variable against multiple values. This usually results in an `if` statement that is *way* too long for comfortable reading/parsing of the code:

    if( foo == 'enterprise' || foo == 'pioneer' || foo == 'custom-enterprise' || foo == 'team' || foo == 'custom-team' ) {
        myFunction( varName, false );
    }

A different way of doing this would be to use a `switch` statement. This cuts down on the repetitious typing of my variable `foo` while also providing a vertical layout which lends itself to being more readable and scanable when comparing lots of values.

    switch( variable ) {
        case 'enterprise':
        case 'custom-enterprise':
        case 'custom-team'
        case 'team':
        case 'pioneer':
            myFunction( varName, false );
            break;
    } 

## Prototyping in a Text Editor

I was trying to figure out my HTML class names based on the BEM methodology. I found it much easier to write out the HTML in my own, weird short-hand and tweak/rename things as I go along creating the strucutre. Something like this:

    <li#team.plan.plan--active.plan--active-direct-click>
        <div.plan__condensed>
            <h3><em>Enterprise</em> Large organizations</h3>
            <ul.plan-tiers
                <li>
                    <span.plan-tiers__price>$2.50</span>
                    <span.plan-tiers__rate>/user/month</span>
                    <span.plan-tiers__users>50 users</span>
                </li>
                <li>...</li>
                <li>...</li>
            </ul>
            <p.plan-contract>Annual Contract</p>
            <p.plan-actions>
                <a.button href="#team-plan">Learn More</a>
                <a.button>...</a>
            </p>
        <div.plan__expanded#team-plan-expanded></div>
        <div.plan__expanded#enterprise-plan-expanded></div>        
    </li>

Once I get things marked up in a structure that makes sense, both from a semantic and naming methodology point of view, I use my short-hand as a reference template as I begin writing actual code. 

You’ve probably learned this yourself, but sometimes just creating names as you go results in code and strucutre which don’t make a whole lot of sense when everything’s ready to ship. This is an easier way of writing everything the first time, then burning it down and writing it again using what I learned. Like prototyping on paper, but in a text editor.