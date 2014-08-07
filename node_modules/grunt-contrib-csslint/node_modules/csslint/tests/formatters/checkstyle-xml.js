(function(){

    /*global YUITest, CSSLint*/
    var Assert = YUITest.Assert;

    YUITest.TestRunner.add(new YUITest.TestCase({

        name: "Checkstyle XML formatter test",

        "File with no problems should say so": function(){
            var result = { messages: [], stats: [] },
                expected = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<checkstyle>\n</checkstyle>";
            Assert.areEqual(expected, CSSLint.format(result, "FILE", "checkstyle-xml"));
        },

        "File with problems should list them": function(){
            var result = { messages: [
                     { type: "warning", line: 1, col: 1, message: "BOGUS", evidence: "ALSO BOGUS", rule: { id: "a-rule", name: "A Rule"} },
                     { type: "error", line: 2, col: 1, message: "BOGUS", evidence: "ALSO BOGUS", rule: { id: "some-other-rule", name: "Some Other Rule"} }
                ], stats: [] },
                file = "\t<file name=\"FILE\">\n",
                error1 = "\t\t<error line=\"1\" column=\"1\" severity=\"warning\" message=\"BOGUS\" source=\"net.csslint.a-rule\"/>\n",
                error2 = "\t\t<error line=\"2\" column=\"1\" severity=\"error\" message=\"BOGUS\" source=\"net.csslint.some-other-rule\"/>\n",
                expected = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<checkstyle>\n" + file + error1 + error2 + "\t</file>\n</checkstyle>",
                actual = CSSLint.format(result, "FILE", "checkstyle-xml");
            Assert.areEqual(expected, actual);
        },

        "Formatter should escape special characters": function() {
            var specialCharsSting = 'sneaky, "sneaky", <sneaky>, sneak & sneaky',
                result = { messages: [
                     { type: "warning", line: 1, col: 1, message: specialCharsSting, evidence: "ALSO BOGUS", rule: [] },
                     { type: "error", line: 2, col: 1, message: specialCharsSting, evidence: "ALSO BOGUS", rule: [] }
                ], stats: [] },
                file = "\t<file name=\"FILE\">\n",
                error1 = "\t\t<error line=\"1\" column=\"1\" severity=\"warning\" message=\"sneaky, &quot;sneaky&quot;, &lt;sneaky&gt;, sneak &amp; sneaky\" source=\"\"/>\n",
                error2 = "\t\t<error line=\"2\" column=\"1\" severity=\"error\" message=\"sneaky, &quot;sneaky&quot;, &lt;sneaky&gt;, sneak &amp; sneaky\" source=\"\"/>\n",
                expected = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<checkstyle>\n" + file + error1 + error2 + "\t</file>\n</checkstyle>",
                actual = CSSLint.format(result, "FILE", "checkstyle-xml");
            Assert.areEqual(expected, actual);
        }

    }));
})();
