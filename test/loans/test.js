const assert = require('chai').expect;
const Loan = require('app/js/loan').Loan;

describe('compounding interest loan', function() {
  describe('loan properties', function() {
    const initialAmt = 100;
    const interestRate = 0.7;

    beforeEach('create a new loan', function() {
      this.loan = new Loan(initialAmt, interestRate);
    });

    it("should be a constructor", function() {
      expect(Loan).to.be.a('function');
      expect(this.loan).to.be.an('object');
    });
    
    it("should make it's amount available immutably", function() {
      expect(this.loan.amount()).to.equal(initialAmt);
      expect(this.loan.amount).to.be.a('function');
    });

    it("should make it's interest rate available immutably", function() {
      expect(this.loan.rate()).to_equal(interestRate);
      expect(this.loan.rate).to.be.a('function');
    });

    it('should equal the initial value given no days', function() {
      let numDays = 0;
      expect(this.loan.calc(numDays))
        .to.equal(initialAmt);
    });

    it('should return a new Loan upon initial amount adjustment', function() {
      let adjustment = 20;
      let biggerLoan = this.loan.increaseAmt(adjustment);
      let smallerLoan = this.loan.decreaseAmt(adjustment);

      expect(biggerLoan).to.be.an('object');
      expect(smallerLoan).to.be.an('object');
      expect(biggerLoan.amount()).to.equal(initialAmt + adjustment);
      expect(smallerLoan.amount()).to.equal(initialAmt - adjustment);
    });

    it('should return a new Loan upon interest rate adjustment', function() {
      let adjustment = 0.2;
      let biggerLoan = this.loan.increaseRate(adjustment);
      let smallerLoan = this.loan.decreaseRate(adjustment);

      expect(biggerLoan).to.be.an('object');
      expect(smallerLoan).to.be.an('object');
      expect(biggerLoan.amount()).to.equal(interestRate + adjustment);
      expect(smallerLoan.amount()).to.equal(interestRate - adjustment);
    });
  });

  describe('loan calculation', function() {
    const initialAmt = 100;
    const interestRate = 0.7;

    beforeEach('create a new loan', function() {
      this.loan = new Loan(initialAmt, interestRate);
    });

    it('should return a number for a day', function() {
      expect(this.loan.onDay(10)).to.be.a('number');
    });

    it('should be able to calculate a new loan', function() {
      let calculationDay = 10;
      let calculatedLoan = this.loan.loanFromDay(calculationDay);
      expect(calculatedLoan).to.be('object');
      expect(calculatedLoan.amount())
        .to.equal(this.loan.onDay(calculationDay));
      expect(calculatedLoan.rate()).to.equal(this.loan.rate());
    });

    it('should grow exponentially', function() {
      let zeroDayAmt = 100;
      let oneDayAmt = 100 * (1 + 0.7);
      let twoDayAmt = 100 * Math.pow(1 + 0.7, 2);
      let oneHundredDayAmt = 100 * Math.pow(1 + 0.7, 100);

      expect(this.loan.onDay(0)).to.equal(zeroDayAmt);
      expect(this.loan.onDay(1)).to.equal(oneDayAmt);
      expect(this.loan.onDay(2)).to.equal(twoDayAmt);
      expect(this.loan.onDay(100)).to.equal(oneHundredDayAmt);
    });

    it('should have a constant amount given a rate of 0', function() {
    });
  });

  describe('loan bundling', function() {
    const initialOne = 100;
    const rateOne = 0.02;
    const initialTwo = 200;
    const rateTwo = 0.01;

    beforeEach('generate loans and a bundle', function() {
      this.loanOne = new Loan(initialOne, rateOne);
      this.loanTwo = new Loan(initialTwo, rateTwo);
      this.loanBundle = loanOne.bundle(loanTwo);
    });

    it('should have a daily calculation equal to the sum of its components',
      function() {
        let calculationDay = 10;
        let sum = this.loanOne.onDay(calculationDay) \
                  + this.loanTwo.onDay(calculationDay);
        expect(this.loanBundle.onDay(calculationDay))
          .to.equal(sum);
    });

    it('should not allow duplicates in the bundle', function() {
      let initialBundleSize = this.loanBundle.size();
      expect(this.loanBundle.bundle(this.loanOne).size)
        .to.be.equal.to(initialBundleSize)
    });

    it('should chain', function() {

    });

    it('should maintain duplicate restriction across chains', function() {

    });
  });
});
