const hre = require("hardhat");
const {expect}= require("chai");


describe("Degen Contracts", function(){

    let Token;
    let DegenToken;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function(){
     Token = await ethers.getContractFactory("Degen");
     [owner,addr1,addr2] = await hre.ethers.getSigners();

     DegenToken = await Token.deploy();

    })

    describe("deoloyment",function(){
       it("Should set correct owner",async function(){
        expect(await DegenToken.owner()).to.equal(owner.address);
       });

    })

    describe("Transaction",function(){
        it("Should mint token to a account",async function(){
            await DegenToken.mint(addr1,200);
            // await DegenToken.transferTokens(addr1,addr2,100);
            const addr1Balance = await DegenToken.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(200);


        })
        it("Should transfer token between accounts",async function(){
            await DegenToken.mint(owner,200);
            await DegenToken.transferTokens(addr2,50);
            const ownerBalance = await DegenToken.balanceOf(owner.address);
            expect(ownerBalance).to.equal(150);


        })
        it("Should Burn tokens",async function(){
            await DegenToken.mint(owner,200);
            await DegenToken.Burn(50);
            const ownerBalance = await DegenToken.balanceOf(owner.address);
            expect(ownerBalance).to.equal(150);
 })
 it("Should mint reward token to a account",async function(){
    await DegenToken.mintReward();
    // await DegenToken.transferTokens(addr1,addr2,100);
    const ownerBalance = await DegenToken.balanceOf(owner.address);
    expect(Number(hre.ethers.formatEther(ownerBalance))).to.equal(5);


})


    })


})