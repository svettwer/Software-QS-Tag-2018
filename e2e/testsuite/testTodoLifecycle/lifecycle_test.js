_dynamicInclude($includeFolder);
var testCase = new TestCase(50, 70);
var env = new Environment();
var screen = new Region();

var pdfFilePath = "~/todo-backup.pdf";
try {

    //Check laylout
    _highlight(_heading1("TODO list"));
    _highlight(_list("list-group"));
    _highlight(_heading2("New TODO entry"));
    _highlight(_label("Title"));
    _highlight(_textbox("title"));
    _highlight(_label("Description"));
    _highlight(_textarea("description"));
    _highlight(_submit("Add"));
    testCase.endOfStep("Test todo page layout", 10);

    // Add entry
    _highlight(_textbox("title"));
    _click(_textbox("title"));
    _setValue(_textbox("title"), "Sample todo");

    _highlight(_textarea("description"));
    _click(_textarea("description"));
    _setValue(_textarea("description"), "Sample todo description");

    _highlight(_submit("Add"));
    _click(_submit("Add"));
    testCase.endOfStep("Add todo entry", 10);

    //load images
    testCase.addImagePaths("centos_chrome");

    //open print preview
    env.type("p", Key.CTRL);

    //save as pdf
    screen.find("save_button").highlight().click();
    env.sleep(1);
    env.type("a", Key.CTRL) //mark filename in "save under" dialog
        .type(pdfFilePath + Key.ENTER) //type filename and press ENTER
        .sleep(1);

    //Complete entry
    _highlight(_listItem("Sample todox"));
    _highlight(_checkbox("complete"));
    _click(_checkbox("complete"));
    testCase.endOfStep("Complete todo entry", 10);

    //Delete entry
    _highlight(_span("x"));
    _click(_span("x"));
    testCase.endOfStep("Delete todo entry", 10);

} catch (e) {
    testCase.handleException(e);
} finally {
    testCase.saveResult();
}
