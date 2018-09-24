/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* Test suite for RSS Feeds
    */
    describe('RSS Feeds', function() {
        /* This tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url is defined and not empty', function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined;
                expect(feed.url.length).not.toEqual(0);
            });
        });

        /* This test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name is defined and not empty', function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined;
                expect(feed.name.length).not.toEqual(0);
            });
        });
    });


    /* Test suite for "The menu" */
    describe('The menu', function(){
        /* This test ensures the menu element is
         * hidden by default. 
         */
        it('element is hidden by default', function(){
            var menuBody = $('body').hasClass("menu-hidden");
            expect(menuBody).toBe(true);
        });

         /* This test ensures that the menu changes
          * visibility when the menu icon is clicked. 
          */
         it('displays when clicked and hides when clicked again',function(){
            var menuIcon = $('.menu-icon-link');             
            var menuBody = $('body');   

            // menu icon toggle to show the menu
            menuIcon.click();

          //test to see the menu display after menu icon is clicked
            expect(menuBody.hasClass("menu-hidden")).toBe(false);

            // menu icon toggle to hide the menu
            menuIcon.click();

            // test to see menu is hidden when clicked again.
            expect(menuBody.hasClass("menu-hidden")).toBe(true);
         });
    });
    
    /* Test suite for "Initial Entries" */
    describe('Initial Entries',function(){
        // used for asynchronous loadFeed() call
        beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
        });

        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('contains at least a single entry',function(){
            var feedEntry = $('.feed .entry');
           expect(feedEntry.length).toBeGreaterThan(0); 
        });
    });
    /* Test suite for "New Feed Selection" */
    describe('New Feed Selection', function(){
        var previousFeed;

        // used for asynchronous loadFeed() call
        beforeEach(function(done){
            loadFeed(0, function(){
                previousFeed = $('.feed').html();
                loadFeed(1, function(){
                    done();
                });
            });
        });

        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('changes the content', function(){
            var currentFeed = $('.feed').html();
            expect(currentFeed).not.toBe(previousFeed)
        });
    });
}());
