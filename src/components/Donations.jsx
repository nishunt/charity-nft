import React from "react";
import styled from "styled-components";
import EllipsisText from "react-ellipsis-text";
import { ethers } from "ethers";

function Donations({ events }) {
  const donationClickHandler = (hash) => {
    window.open(`https://rinkeby.etherscan.io/tx/${hash}`, "_blank");
  };
  return (
    <Container>
      <Headers>
        <ImageHeading>Donations</ImageHeading>
        <From>From</From>
        <Amount>Amount</Amount>
      </Headers>

      <DonationContainer>
        {/* mapping in reverse direction, ie. newest first */}
        {events
          .slice(0)
          .reverse()
          .map((event, index) => (
            <Donation
              key={index}
              onClick={() => donationClickHandler(event.transactionHash)}
            >
              <ProfileImageContainer>
                <ProfileImage
                  src={`https://avatars.dicebear.com/api/croodles-neutral/${event.blockNumber}.svg`}
                />
              </ProfileImageContainer>
              <From>
                <EllipsisText text={event.args[0]} length={50} />
              </From>
              <Amount>
                {parseFloat(ethers.utils.formatEther(event.args[1])).toFixed(2)}{" "}
                eth
              </Amount>
            </Donation>
          ))}
      </DonationContainer>
    </Container>
  );
}

export default Donations;

const ProfileImage = styled.img`
  justify-content: center;
  background-color: #cccccc;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  box-shadow: 12px 12px 40px -7px black;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #fff;
    box-shadow: 0px 0px 40px 5px white;
    font-weight: bold;
    text-shadow: 0px 0px 12px white;
`;

const ProfileImageContainer = styled.div`
  flex: 0.2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #105751;
`;

const From = styled.div`
  flex: 0.6;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #105751;
  // font-size: 17px;
`;

const Amount = styled.div`
  flex: 0.2;
  background-color: #105751;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Donation = styled.div`
  display: flex;
  align-items: stretch;
  margin-top: 3px;
  cursor: pointer;
`;

const DonationContainer = styled.div`
  // display: flex;
  // flex-direction: column;
  height: 100%;
  overflow-y: scroll;
  // here's how to hide the scrollbar.
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ImageHeading = styled.div`
  flex: 0.2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #105751;
`;

const Headers = styled.div`
  display: flex;
  font-size: 17px;
  text-shadow: 0px 0px 12px white;
`;
const Container = styled.div`
  width: 70%;
  border-radius: 20px;
  overflow: hidden;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 17px;
`;
