// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};


// Creating a factory function for pAequor objects
const qAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      let currentBase = this.dna[randomIndex];
      let newBase; 
      do {
        newBase = returnRandBase();
      } while (currentBase === newBase);
      this.dna = this.dna.split("");
      this.dna[randomIndex] = newBase;
      this.dna = this.dna.join("");
      return this.dna;
    },
    compareDNA(otherOrganism) {
      let identicalBases = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherOrganism.dna[i]) {
          identicalBases++;
        }
      }
      if (identicalBases === 0) {
        console.log(`Specimen #${this.specimenNum} and Specimen #${otherOrganism.specimenNum} have no DNA in common.`);
      } else {
        const percentage = (identicalBases / this.dna.length) * 100;
        console.log(`Specimen #${this.specimenNum} and Specimen #${otherOrganism.specimenNum} have ${percentage.toFixed(2)}% DNA in common.`);
      }
    },
    willLikelySurvive() {
      let cCount = 0;
      let gCount = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C') {
          cCount++;
        } else if (this.dna[i] === 'G') {
          gCount++;
        }
      }
      const percentageCG = (cCount + gCount) / this.dna.length * 100;
      return percentageCG >= 60;
    }
  };
}; 

const survivingOrganisms = [];
const numOfSurvivors = 30; 

let organismCount = 0;
while (survivingOrganisms.length < numOfSurvivors) {
  const newOrganism = qAequorFactory(organismCount, mockUpStrand());
  if (newOrganism.willLikelySurvive()) {
    survivingOrganisms.push(newOrganism);
  }
  organismCount++;
};


