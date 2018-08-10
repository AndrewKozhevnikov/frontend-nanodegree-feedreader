/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    describe('RSS Feeds', () => {
        /**
         * Ensures that allFeeds is defined
         * And its length is not empty.
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /**
         * Ensures that every feed object from allFeeds has an url.
         * And that the url is not empty.
         */
        it('all urls are defined', () => {
            allFeeds.forEach(f => {
                expect(f.url).toBeDefined();
                expect(f.url.length).not.toBe(0);
            });
        });

        /**
         * Ensures that every feed object from allFeeds has a name.
         * And that the name is not empty.
         */
        it('all names are defined', () => {
            allFeeds.forEach(f => {
                expect(f.name).toBeDefined();
                expect(f.name.length).not.toBe(0);
            });
        });
    });

    describe('The menu', () => {
        let menuIcon = $('.menu-icon-link');
        let body = $('body');

        /**
         * Ensures that the menu element is hidden by default.
         */
        it('menu element is hidden by default', () => {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        /**
         * Ensures that the menu changes visibility when the menu icon is clicked.
         * This test has two expectations:
         * 1. does the menu display when clicked
         * 2. and does it hide when clicked again.
         */
        it('menu changes visibility when the menu icon is clicked', () => {
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', () => {
        beforeEach(done => loadFeed(0, done));

        /**
         * Ensures that when the #loadFeed(...) function completes its work,
         * there is at least a single .entry element within the .feed container.
         */
        it('there is at least a single feed entry', done => {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', () => {
        let feed = $('.feed');
        let oldFeed;
        let newFeed;

        beforeEach(done => {
            loadFeed(0, () => {
                oldFeed = feed.html();

                loadFeed(1, () => {
                    newFeed = feed.html();
                    done();
                });
            });
        });

        /**
         * Ensures that when a new feed is loaded that the content actually changes.
         */
        it('the content actually changes on loadFeed', done => {
            expect(oldFeed).not.toBe(newFeed);
            done();
        });
    });
}());
