import React, { useState } from 'react'
import * as HDWallet from 'ethereum-hdwallet'
import * as bip39 from 'bip39';

const Wallet = () => {

    const [mnemonic, setMnemonic] = useState();
    const [recoveryMnemonic, setRecoveryMnemonic] = useState();
    const [privateKey, setPrivateKey] = useState();
    const [address, setAddress] = useState();
    const [recoveredAddress, setRecoveredAddress] = useState();

    

    const getAddress = async()=>{
        // Generate a new master seed
        const mnemonic = bip39.generateMnemonic();
        setMnemonic(mnemonic);

        // Create a new HD wallet using the master seed
        const hdwallet = HDWallet.fromMnemonic(mnemonic)
     
        // Create a new Address using HD wallet 
        const path_Address = `m/44'/60'/0'/0/0`
        const address = `0x${hdwallet.derive(path_Address).getAddress().toString('hex')}`
        setAddress(address)

        // Get the private key for an address
        const path_Private = "m/44'/0'/0'/0/0";
        const privateKey = hdwallet.derive(path_Private).getPrivateKey().toString('hex');
        setPrivateKey(privateKey)
        
    }

    const restoreWalletAddress = async(mnemonic)=>{

        const hdwallet = HDWallet.fromMnemonic(mnemonic)

        // Restore the wallet from the master seed
        const path_Address = `m/44'/60'/0'/0/0`
        const address = `0x${hdwallet.derive(path_Address).getAddress().toString('hex')}`
        setRecoveredAddress(address)

            // Get the private key for an address
        const path_Private = "m/44'/0'/0'/0/0";
        const privateKey = hdwallet.derive(path_Private).getPrivateKey().toString('hex');
        console.log('Private Key', privateKey);

    }


  return (
    <div>
        <h1>Create Your Wallet Address</h1>
        <div>
            <button onClick={() =>getAddress()}>Create Wallet Address</button>
            <h4>mnemonic : {mnemonic}</h4>
            <h4>Private Key : {privateKey}</h4>
            <h4>Address : {address}</h4>
        </div><br/><br/>
        <h1>Recover Your Wallet Address</h1>
        <div>
            <label>Please provide your 12 phrasses seed / mnemonics :
                <input type='text' value={recoveryMnemonic} onChange={(e)=> setRecoveryMnemonic(e.target.value)}/>
            </label>
            <p>Recovery mnemonic : {recoveryMnemonic}</p>
            <h4>Recovered Address : {recoveredAddress}</h4><br/>
            <button onClick={() =>restoreWalletAddress(recoveryMnemonic)}>Restore your Wallet Address</button>
        </div>
    </div>
  )
}

export default Wallet





