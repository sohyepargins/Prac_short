PennController.ResetPrefix(null); // Initiates PennController

Sequence( "intro", "intro2", randomize("experiment") , SendResults() , "bye" )

Header(
    // We will use this global Var element later to store the participant's name
    newVar("ParticipantName")
        .global()
    ,
    // Delay of 250ms before every trial
    newTimer(250)
        .start()
        .wait()
)
.log( "Name" , getVar("ParticipantName") )


newTrial( "intro" ,
    newImage("logo.png")
        .size( 300, 200 )      // Resize the image to 150x250px
        .print()
    ,
    newText("<p>Welcome to the PCIbex demo experiment.</p><p>Please enter your name below and press Enter:</p>")
        .print()
    ,
    newTextInput()
        .print()
        .wait()                 // The next command won't be executed until Enter is pressed
        .setVar( "ParticipantName" )
        // This setVar command stores the value from the TextInput element into the Var element
)



newTrial("intro2",
    defaultText
        .print()
    ,
    newText("<p>Welcome!</p>")
    ,
    newText("<p>In this experiment, you will hear a series of word pairs. </p>")
    ,
    newText("<p> For each pair, you have to answer whether the SECOND item is a real English word or not.</p>")
    ,
    newText("<p> If you think the second item is a real word, press the <strong>J</strong> key.</p>")
    ,
    newText("<p> If you think the second item does not exist in English, press the <strong>F</strong> key.</p>")
    ,
    newText("<p>Click the button below to start the experiment.</p>")
    ,
    newButton("Start")
        .print()
        .wait()
)

// Start typing your code here
Template( "pracshort.csv", row =>
    newTrial("experiment",
        newAudio("prime", row.PrimeAudio)
            .play()
            .wait()
        ,
        newTimer(150)
            .start()
            .wait()
        ,
        newAudio("target", row.TargetAudio)
            .play()
        ,
        newKey("FJ")
            .log()
            .wait()
        ,
        getAudio("target")
            .stop()

    )
    .log("list", row.Group)
    .log("condition", row.Condition)
    .log("correct", row.Correct)
)


newTrial( "bye" ,
    newText("Thank you for your participation!").print(),
    newButton().wait()  // Wait for a click on a non-displayed button = wait here forever
)
.setOption( "countsForProgressBar" , false )