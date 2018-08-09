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
    describe('RSS Feeds', function () {
        /**
         * Ensures that allFeeds is defined
         * And its length is not empty.
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /**
         * Ensures that every feed object from allFeeds has an url.
         * And that the url is not empty.
         */
        it('all urls are defined', function () {
            allFeeds.forEach(f => {
                expect(f.url).toBeDefined();
                expect(f.url.length).not.toBe(0);
            });
        });

        /**
         * Ensures that every feed object from allFeeds has a name.
         * And that the name is not empty.
         */
        it('all names are defined', function () {
            allFeeds.forEach(f => {
                expect(f.name).toBeDefined();
                expect(f.name.length).not.toBe(0);
            });
        });
    });

    describe('The menu', function () {
        let menuIcon = $('.menu-icon-link');
        let body = $('body');

        /**
         * Ensures that the menu element is hidden by default.
         */
        it('menu element is hidden by default', function () {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        /**
         * Ensures that the menu changes visibility when the menu icon is clicked.
         * This test has two expectations:
         * 1. does the menu display when clicked
         * 2. and does it hide when clicked again.
         */
        it('menu changes visibility when the menu icon is clicked', function () {
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function () {
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        /**
         * Ensures that when the #loadFeed(...) function completes its work,
         * there is at least a single entry element within the .feed container.
         */
        it('there is at least a single feed entry', function (done) {
            expect($('.feed').children().length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function () {
        let feed = $('.feed');
        let oldFeed;
        let newFeed;

        beforeEach(function (done) {
            loadFeed(0, () => {
                oldFeed = feed.children();
                done();
            });
            loadFeed(1, () => {
                newFeed = feed.children();
                done();
            });
        });

        /**
         * Ensures that when a new feed is loaded that the content actually changes.
         */
        it('the content actually changes on loadFeed', function (done) {
            expect(oldFeed).not.toBe(newFeed);
            done();
        });
    });
}());
