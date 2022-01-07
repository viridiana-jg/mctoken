import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { bindNodeCallback, Observable } from 'rxjs';
import { AbiItem } from 'web3-utils';
import { Buffer } from 'buffer';
import { Subject } from 'rxjs';

import Web3 from 'web3';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

@Injectable({providedIn: 'root'})
export class Web3Service {
    public abi: any;
    public contractAddress: string;
    public contrato: any;
    public accounts: any;
    public web3js: any;    
    public provider: any;    
    web3Modal;
    
    private accountStatusSource = new Subject<any>();
    accountStatus$ = this.accountStatusSource.asObservable();

    constructor() {
        const providerOptions = {
            walletconnect: {
              package: WalletConnectProvider, // required
              options: {
                infuraId: "wss://ropsten.infura.io/ws/v3/5a1b7c91b4314574a575b9d3e3c8b6bb" // required
              }
            }
          };

        this.web3Modal = new Web3Modal({
            network: "ropsten", // optional
            cacheProvider: true, // optional
            providerOptions, // required
            theme: {
                background: "rgb(39, 49, 56)",
                main: "rgb(199, 199, 199)",
                secondary: "rgb(136, 136, 136)",
                border: "rgba(195, 195, 195, 0.14)",
                hover: "rgb(16, 26, 32)"
            }
        });

        // tslint:disable-next-line:max-line-length              
        this.abi = JSON.parse('[{"constant": false,"inputs": [{"name": "toAddress","type": "address"},{"name": "amount","type": "uint256"},{"name": "points","type": "uint256"},{"name": "totalPoints","type": "uint256"}],"name": "sendPoints","outputs": [{"name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "name","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "spender","type": "address"},{"name": "tokens","type": "uint256"}],"name": "approve","outputs": [{"name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "totalSupply","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "from","type": "address"},{"name": "to","type": "address"},{"name": "tokens","type": "uint256"}],"name": "transferFrom","outputs": [{"name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "toAddress","type": "address"},{"name": "points","type": "uint256"},{"name": "totalPoints","type": "uint256"}],"name": "exchangePoints","outputs": [{"name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "totalAmount","type": "uint256"}],"name": "setAmount","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "decimals","outputs": [{"name": "","type": "uint8"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "_totalSupply","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "getRewardPoints","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "tokenOwner","type": "address"}],"name": "balanceOf","outputs": [{"name": "balance","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "points","type": "uint256"}],"name": "setExchangedRewardPoints","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "symbol","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "a","type": "uint256"},{"name": "b","type": "uint256"}],"name": "safeSub","outputs": [{"name": "c","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "to","type": "address"},{"name": "tokens","type": "uint256"}],"name": "transfer","outputs": [{"name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "getExchangedRewardPoints","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "a","type": "uint256"},{"name": "b","type": "uint256"}],"name": "safeDiv","outputs": [{"name": "c","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "points","type": "uint256"}],"name": "setRewardPoints","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "spender","type": "address"},{"name": "tokens","type": "uint256"},{"name": "data","type": "bytes"}],"name": "approveAndCall","outputs": [{"name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "a","type": "uint256"},{"name": "b","type": "uint256"}],"name": "safeMul","outputs": [{"name": "c","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "getAmount","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "tokenOwner","type": "address"},{"name": "spender","type": "address"}],"name": "allowance","outputs": [{"name": "remaining","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "getTotalRewardPoints","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "a","type": "uint256"},{"name": "b","type": "uint256"}],"name": "safeAdd","outputs": [{"name": "c","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "points","type": "uint256"}],"name": "setTotalRewardPoints","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"inputs": [],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"payable": true,"stateMutability": "payable","type": "fallback"},{"anonymous": false,"inputs": [{"indexed": true,"name": "from","type": "address"},{"indexed": true,"name": "to","type": "address"},{"indexed": false,"name": "tokens","type": "uint256"}],"name": "Transfer","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "tokenOwner","type": "address"},{"indexed": true,"name": "spender","type": "address"},{"indexed": false,"name": "tokens","type": "uint256"}],"name": "Approval","type": "event"}]');
        this.contractAddress = '0xa2EF1dB0A8E29df2f52d08529553323B6518319a';     
    }
      
    async connectAccount() {
        this.web3Modal.clearCachedProvider();
    
        this.provider = await this.web3Modal.connect(); // set provider
        this.web3js = new Web3(this.provider); // create web3 instance
        this.accounts = await this.web3js.eth.getAccounts(); 
        this.accountStatusSource.next(this.accounts)
        this.contrato = new this.web3js.eth.Contract(this.abi, this.contractAddress);   
    }  
    
}

/*

constructor() {
        this.web3 = new Web3();

        this.web3.setProvider(
            new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/c0c8c037208043debd3192efe93ed1d2')
        );

        //this.sender = '0xf65112fa0998477c990fb71722b067b7892f2160';
        this.sender = '0xAFF7B3C82d2B3B2270db013E0Cbf2783ED514bF1';

        this.web3.eth.defaultAccount = this.sender;
        
        // tslint:disable-next-line:max-line-length              
        this.abi = JSON.parse('[{"constant":false,"inputs":[],"name":"increment","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldValue","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newValue","type":"uint256"}],"name":"ValueChanged","type":"event"},{"constant":true,"inputs":[],"name":"getCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]');
        this.contractAddress = '0x99E5a41b66702D9d54428d48FE9C8dEE2DDc6CbC';

        this.contrato = new this.web3.eth.Contract(this.abi, this.contractAddress);
    }
*/
