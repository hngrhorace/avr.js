"use strict";
var avr = {
	/** Program counter */
	PC: 0,
	/** Stack pointer */
	SP: 8,
	SPL: 0,
	SPH: 0,
	/** SREG */
	sreg: {
		7: false, /* I - Global interrupt enable */
		6: false, /* T - Bit Copy Storage */
		5: false, /* H - Half Carry Flag */
		4: false, /* S - Sign Bit */
		3: false, /* V - Two's Complement Overflow Flag */
		2: false, /* N - Negative Flag */
		1: false, /* Z - Zero flag */
		0: false /*  C - Carry flag */
	},
	/* Register space */
	reg: {
		/*       MSB                                                                  LSB */
		0: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		1: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		2: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		3: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		4: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		5: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		6: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		7: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		8: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		9: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		10: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		11: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		12: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		13: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		14: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		15: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		/*       MSB                                                                   LSB */
		16: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		17: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		18: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		19: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		20: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		21: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		22: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		23: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		24: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		25: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		26: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		27: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		28: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		29: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		30: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		31: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false}
	},
	stack: {
		0: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		1: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		2: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		3: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		4: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		5: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		6: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false},
		7: {7: false, 6: false, 5: false, 4: false, 3: false, 2: false, 1: false, 0: false}
	},
	memory: [],
	/**
	 * AND – Logical AND
	 * 
	 * Performs the logical AND between the contents of register Rd and register Rr 
	 * and places the result in the destination register Rd.
	 *
	 * @param _Rd    Destination register
	 * @param _Rr
	 */
	and: function(_Rd, _Rr) {

		var Rd = this.reg[_Rd];
		var Rr = this.reg[_Rr];
		/* Operation: Rd <- Rd && Rr */
		Rd[0] = Rd[0] && Rr[0];
		Rd[1] = Rd[1] && Rr[1];
		Rd[2] = Rd[2] && Rr[2];
		Rd[3] = Rd[3] && Rr[3];
		Rd[4] = Rd[4] && Rr[4];
		Rd[5] = Rd[5] && Rr[5];
		Rd[6] = Rd[6] && Rr[6];
		Rd[7] = Rd[7] && Rr[7];

		/* @TODO */
		this.sreg[4];
		/* Cleared */
		this.sreg[3] = false;
		/* Set if MSB of the result is set; cleared otherwise. */
		this.sreg[2] = Rd[7];
		/* Set if the result is $00; cleared otherwise. */
		this.sreg[1] = !Rd[7] && !Rd[6] && !Rd[5] && !Rd[4] && !Rd[3] && !Rd[2] && !Rd[1] && !Rd[0];
		/* Program counter */
		this.PC++;

		this.reg[_Rd] = Rd;
	},
	/**
	 * ANDI – Logical AND with Immediate
	 * 
	 * Performs the logical AND between the contents of register Rd and a constant 
	 * and places the result in the destination register Rd.
	 *
	 * @param _Rd
	 * @param K
	 */
	andi: function(_Rd, K) {

		var Rd = this.reg[_Rd];

		/* Operation: Rd <- Rd && K */
		Rd[0] = Rd[0] && K[0];
		Rd[1] = Rd[1] && K[1];
		Rd[2] = Rd[2] && K[2];
		Rd[3] = Rd[3] && K[3];
		Rd[4] = Rd[4] && K[4];
		Rd[5] = Rd[5] && K[5];
		Rd[6] = Rd[6] && K[6];
		Rd[7] = Rd[7] && K[7];

		/* @TODO */
		this.sreg[4];
		/* Cleared */
		this.sreg[3] = false;
		/* Set if MSB of the result is set; cleared otherwise. */
		this.sreg[2] = Rd[7];
		/* Set if the result is $00; cleared otherwise. */
		this.sreg[1] = !Rd[7] && !Rd[6] && !Rd[5] && !Rd[4] && !Rd[3] && !Rd[2] && !Rd[1] && !Rd[0];

		this.PC++;

		this.reg[_Rd] = Rd;
	},
	/** 
	 * BCLR – Bit Clear in SREG
	 * 
	 * Bit clear in SREG
	 *
	 * @param s
	 */
	bclr: function(s) {

		/* @TODO */
		switch (s) {
			case 7:
				this.sreg[7] = false;
				break;
			case 6:
				this.sreg[6] = false;
				break;
			case 5:
				this.sreg[5] = false;
				break;
			case 4:
				this.sreg[4] = false;
				break;
			case 3:
				this.sreg[3] = false;
				break;
			case 2:
				this.sreg[2] = false;
				break;
			case 1:
				this.sreg[1] = false;
				break;
			case 0:
				this.sreg[0] = false;
				break;
		}

		this.PC++;
	},
	/**
	 * BRBC – Branch if Bit in SREG is Cleared
	 * 
	 * Conditional relative branch.
	 * Tests a single bit in SREG and branches relatively to PC if the bit is cleared. 
	 * This instruction branches relatively to PC in either direction (PC - 63 ≤ destination ≤ PC + 64). 
	 * The parameter k is the offset from PC and is represented in two’s complement form.
	 * 
	 * @param s
	 * @param k
	 */
	brbc: function(s, k) {

		/* Operation: If SREG(s) = 0 then PC <- PC + k + 1, else PC <- PC + 1 */
		if (this.sreg[s] === false) {
			this.PC = this.PC + k;
		}

		this.PC++;
	},
	/**
	 * BRBS – Branch if Bit in SREG is Set
	 * 
	 * Conditional relative branch. 
	 * Tests a single bit in SREG and branches relatively to PC if the bit is set. 
	 * This instruction branches relatively to PC in either direction (PC - 63 ≤ destination ≤ PC + 64). 
	 * The parameter k is the offset from PC and is represented in two’s complement form.
	 * 
	 * @param s
	 * @param k
	 */
	brbs: function(s, k) {

		/* Operation: If SREG(s) = 1 then PC <- PC + k + 1, else PC <- PC + 1 */
		if (this.sreg[s] === true) {
			this.PC = this.PC + k;
		}

		this.PC++;
	},
	/**
	 * BRCC – Branch if Carry Cleared
	 * 
	 * Conditional relative branch. 
	 * Tests the Carry Flag (C) and branches relatively to PC if C is cleared. 
	 * This instruction branches relatively to PC in either direction (PC - 63 ≤ destination ≤ PC + 64). 
	 * The parameter k is the offset from PC and is represented in two’s complement form. 
	 * (Equivalent to instruction BRBC 0,k).
	 * 
	 * @param k
	 */
	brcc: function(k) {

		/* Operation: If C = 0 then PC <- PC + k + 1, else PC <- PC + 1 */
		if (this.sreg[0] === false) {
			this.PC = this.PC + k;
		}

		this.PC++;
	},
	/**
	 * BRCS – Branch if Carry Set
	 * 
	 * Conditional relative branch. 
	 * Tests the Carry Flag (C) and branches relatively to PC if C is set. 
	 * This instruction branches relatively to PC in either direction (PC - 63 ≤ destination ≤ PC + 64). 
	 * The parameter k is the offset from PC and is represented in two’s complement form. 
	 * (Equivalent to instruction BRBS 0,k).
	 * 
	 * @param k
	 */
	brcs: function(k) {

		/* Operation: If C = 1 then PC <- PC + k + 1, else PC <- PC + 1 */
		if (this.sreg[0] === true) {
			this.PC = this.PC + k;
		}

		this.PC++;
	},
	/**
	 * BREAK – Break
	 * 
	 * The BREAK instruction is used by the On-chip Debug system, and is normally not used in the application software. 
	 * When the BREAK instruction is executed, the AVR CPU is set in the Stopped Mode. 
	 * This gives the On-chip Debugger access to internal resources.
	 * If any Lock bits are set, or either the JTAGEN or OCDEN Fuses are unprogrammed, 
	 * the CPU will treat the BREAK instruction as a NOP and will not enter the Stopped mode.
	 */
	'break': function() {

		this.PC++;
	},
	/**
	 * BREQ – Branch if Equal
	 * 
	 * Conditional relative branch. 
	 * Tests the Zero Flag (Z) and branches relatively to PC if Z is set. 
	 * If the instruction is executed immediately after any of the instructions CP, CPI, SUB or SUBI, 
	 * the branch will occur if and only if the unsigned or signed binary number represented in Rd was equal 
	 * to the unsigned or signed binary number represented in Rr. 
	 * This instruction branches relatively to PC in either direction (PC - 63 ≤ destination ≤ PC + 64). 
	 * The parameter k is the offset from PC and is represented in two’s complement form.
	 * (Equivalent to instruction BRBS 1,k).
	 * 
	 * @param {type} k
	 * @returns {undefined}
	 */
	breq: function(k) {

		/* Operation: If Rd = Rr (Z = 1) then PC <- PC + k + 1, else PC <- PC + 1 */
		if (this.sreg[1] === true) {
			this.PC = this.PC + k;
		}

		this.PC++;
	},
	/**
	 * BRGE – Branch if Greater or Equal (Signed)
	 * 
	 * Conditional relative branch. 
	 * Tests the Signed Flag (S) and branches relatively to PC if S is cleared. 
	 * If the instruction is executed immediately after any of the instructions CP, CPI, SUB or SUBI,
	 * the branch will occur if and only if the signed binary number represented in Rd was greater than or equal 
	 * to the signed binary number represented in Rr. 
	 * This instruction branches relatively to PC in either direction (PC - 63 ≤ destination ≤ PC + 64).
	 * The parameter k is the offset from PC and is represented in two’s complement form. 
	 * Equivalent to instruction BRBC 4,k).
	 * 
	 * @param {type} k
	 */
	brge: function(k) {

		/* Operation: If Rd ≥ Rr (N ⊕ V = 0) then PC <- PC + k + 1, else PC <- PC + 1 */
		if (this.sreg[4] === false) {
			this.PC = this.PC + k;
		}

		this.PC++;
	},
	/**
	 * BRHC – Branch if Half Carry Flag is Cleared
	 * 
	 * Conditional relative branch. 
	 * Tests the Half Carry Flag (H) and branches relatively to PC if H is cleared. 
	 * This instruction branches relatively to PC in either direction (PC - 63 ≤ destination ≤ PC + 64). 
	 * The parameter k is the offset from PC and is represented in two’s complement form. 
	 * (Equivalent to instruction BRBC 5,k).
	 * 
	 * @param k
	 */
	brhc: function(k) {

		/* Operation: If H = 0 then PC <- PC + k + 1, else PC <- PC + 1 */
		if (this.sreg[5] === false) {
			this.PC = this.PC + k;
		}

		this.PC++;
	},
	/**
	 * BRHS – Branch if Half Carry Flag is Set
	 * 
	 * Conditional relative branch. 
	 * Tests the Half Carry Flag (H) and branches relatively to PC if H is set. 
	 * This instruction branches relatively to PC in either direction (PC - 63 ≤ destination ≤ PC + 64).
	 * The parameter k is the offset from PC and is represented in two’s complement form. 
	 * (Equivalent to instruction BRBS 5,k).
	 * 
	 * @param k
	 */
	brhs: function(k) {

		/* Operation: If H = 1 then PC <- PC + k + 1, else PC <- PC + 1 */
		if (this.sreg[5] === true) {
			this.PC = this.PC + k;
		}

		this.PC++;
	},
	/**
	 * BRID – Branch if Global Interrupt is Disabled
	 * 
	 * Conditional relative branch. 
	 * Tests the Global Interrupt Flag (I) and branches relatively to PC if I is cleared. 
	 * This instruction branches relatively to PC in either direction (PC - 63 ≤ destination ≤ PC + 64).
	 * The parameter k is the offset from PC and is represented in two’s complement form. 
	 * (Equivalent to instruction BRBC 7,k).
	 * 
	 * @param k
	 */
	brid: function(k) {

		/* If I = 0 then PC <- PC + k + 1, else PC <- PC + 1 */
		if (this.sreg[7] === false) {
			this.PC = this.PC + k;
		}

		this.PC++;
	},
	/**
	 * BRIE – Branch if Global Interrupt is Enabled
	 * 
	 * Conditional relative branch. 
	 * Tests the Global Interrupt Flag (I) and branches relatively to PC if I is set.
	 * This instruction branches relatively to PC in either direction (PC - 63 ≤ destination ≤ PC + 64). 
	 * The parameter k is the offset from PC and is represented in two’s complement form. 
	 * (Equivalent to instruction BRBS 7,k).
	 * 
	 * @param k
	 */
	brie: function(k) {

		/* If I = 1 then PC <- PC + k + 1, else PC <- PC + 1 */
		if (this.sreg[7] === true) {
			this.PC = this.PC + k;
		}

		this.PC++;

	},
	/**
	 * BRLO – Branch if Lower (Unsigned)
	 * 
	 * Conditional relative branch. 
	 * Tests the Carry Flag (C) and branches relatively to PC if C is set. 
	 * If the instruction is executed immediately after any of the instructions CP, CPI, SUB or SUBI, 
	 * the branch will occur if and only if the unsigned binary number represented in Rd was smaller 
	 * than the unsigned binary number represented in Rr. 
	 * This instruction branches relatively to PC in either direction (PC - 63 ≤ destination ≤ PC + 64). 
	 * The parameter k is the offset from PC and is represented in two’s complement form.
	 * (Equivalent to instruction BRBS 0,k).
	 * 
	 * @param k
	 */
	brlo: function(k) {

		/* Operation: If Rd < Rr (C = 1) then PC <- PC + k + 1, else PC <- PC + 1 */
		if (this.sreg[0] === true) {
			this.PC = this.PC + k;
		}

		this.PC++;
	},
	/**
	 * BRLT – Branch if Less Than (Signed)
	 * 
	 * Conditional relative branch. 
	 * Tests the Signed Flag (S) and branches relatively to PC if S is set. 
	 * If the instruction is executed immediately after any of the instructions CP, CPI, SUB or SUBI, 
	 * the branch will occur if and only if the signed binary number represented in Rd was less 
	 * than the signed binary number represented in Rr.
	 * This instruction branches relatively to PC in either direction (PC - 63 ≤ destination ≤ PC + 64). 
	 * The parameter k is the offset from PC and is represented in two’s complement form. 
	 * (Equivalent to instruction BRBS 4,k).
	 * 
	 * @param k
	 */
	brlt: function(k) {

		/* Operation: If Rd < Rr (N ⊕ V = 1) then PC ← PC + k + 1, else PC ← PC + 1 */
		if (this.sreg[4] === true) {
			this.PC = this.PC + k;
		}

		this.PC++;

	},
	/**
	 * BRMI – Branch if Minus
	 * 
	 * Conditional relative branch. 
	 * Tests the Negative Flag (N) and branches relatively to PC if N is set. 
	 * This instruction branches relatively to PC in either direction (PC - 63 ≤ destination ≤ PC + 64). 
	 * The parameter k is the offset from PC and is represented in two’s complement form. 
	 * (Equivalent to instruction BRBS 2,k).
	 * 
	 * @param k
	 */
	brmi: function(k) {

		/* If N = 1 then PC <- PC + k + 1, else PC <- PC + 1 */
		if (this.sreg[2] === true) {
			this.PC = this.PC + k;
		}

		this.PC++;
	},
	/**
	 * BRNE – Branch if Not Equal
	 * 
	 * Conditional relative branch. 
	 * Tests the Zero Flag (Z) and branches relatively to PC if Z is cleared. 
	 * If the instruction is executed immediately after any of the instructions CP, CPI, SUB or SUBI, 
	 * the branch will occur if and only if the unsigned or signed binary number represented in Rd was not equal 
	 * to the unsigned or signed binary number represented in Rr. 
	 * This instruction branches relatively to PC in either direction (PC - 63 ≤ destination ≤ PC + 64).
	 * The parameter k is the offset from PC and is represented in two’s complement form.
	 * (Equivalent to instruction BRBC 1,k).
	 * 
	 * @param k
	 */
	brne: function(k) {

		/* If Rd != Rr (Z = 0) then PC <- PC + k + 1, else PC <- PC + 1 */
		if (this.sreg[1] === false) {
			this.PC = this.PC + k;
		}

		this.PC++;
	},
	/**
	 * BRPL – Branch if Plus
	 * 
	 * Conditional relative branch.
	 * Tests the Negative Flag (N) and branches relatively to PC if N is cleared.
	 * This instruction branches relatively to PC in either direction (PC - 63 ≤ destination ≤ PC + 64).
	 * The parameter k is the offset from PC and is brepresented in two’s complement form.
	 * (Equivalent to instruction BRBC 2,k).
	 * 
	 * @param k
	 */
	brpl: function(k) {

		/* Operation: If N = 0 then PC <- PC + k + 1, else PC <- PC + 1 */
		if (this.sreg[2] === false) {
			this.PC = this.PC + k;
		}

		this.PC++;
	},
	/**
	 * BRSH – Branch if Same or Higher (Unsigned)
	 * 
	 * Conditional relative branch. 
	 * Tests the Carry Flag (C) and branches relatively to PC if C is cleared.
	 * If the instruction is executed immediately after execution of any of the instructions CP, CPI, SUB or SUBI,
	 * the branch will occur if and only if the unsigned binary number represented in Rd was greater than or equal
	 * to the unsigned binary number represented in Rr. 
	 * This instruction branches relatively to PC in either direction (PC - 63 ≤ destination ≤ PC + 64).
	 * The parameter k is the offset from PC and is represented in two’s complement form.
	 * (Equivalent to instruction BRBC 0,k).
	 *
	 * @param k
	 */
	brsh: function(k) {

		/* Operation: If Rd >= Rr (C = 0) then PC <- PC + k + 1, else PC <- PC + 1 */
		if (this.sreg[0] === false) {
			this.PC = this.PC + k;
		}

		this.PC++;
	},
	/**
	 * BRTC – Branch if the T Flag is Cleared
	 * 
	 * Conditional relative branch. 
	 * Tests the T Flag and branches relatively to PC if T is cleared. 
	 * This instruction branches relatively to PC in either direction (PC - 63 ≤ destination ≤ PC + 64). 
	 * The parameter k is the offset from PC and is represented in two’s complement form.
	 * (Equivalent to instruction BRBC 6,k).
	 * 
	 * @param k
	 */
	brtc: function(k) {

		/* Operation: If T = 0 then PC <- PC + k + 1, else PC <- PC + 1 */
		if (this.sreg[6] === false) {
			this.PC = this.PC + k;
		}

		this.PC++;
	},
	/**
	 * BRTS – Branch if the T Flag is Set
	 * 
	 * Conditional relative branch. 
	 * Tests the T Flag and branches relatively to PC if T is set.
	 * This instruction branches relatively to PC in either direction (PC - 63 ≤ destination ≤ PC + 64).
	 * The parameter k is the offset from PC and is represented in two’s complement form.
	 * (Equivalent to instruction BRBS 6,k).
	 * 
	 * @param k
	 */
	brts: function(k) {

		/* Operation: If T = 1 then PC <- PC + k + 1, else PC <- PC + 1 */
		if (this.sreg[6] === true) {
			this.PC = this.PC + k;
		}

		this.PC++;
	},
	/** 
	 * BVRC - Branch if Overflow Cleared
	 * 
	 * Conditional relative branch. 
	 * Tests the Overflow Flag (V) and branches relatively to PC if V is cleared.
	 * This instruction branches relatively to PC in either direction (PC - 63 ≤ destination ≤ PC + 64). 
	 * The parameter k is the offset from PC and is represented in two’s complement form. 
	 * (Equivalent to instruction BRBC 3,k).
	 * 
	 * @param k
	 */
	brvc: function(k) {

		/* Operation: If V = 0 then PC <- PC + k + 1, else PC <- PC + 1 */
		if (this.sreg[3] === false) {
			this.PC = this.PC + k;
		}

		this.PC++;
	},
	/**
	 * BRVS – Branch if Overflow Set
	 *
	 * Conditional relative branch. 
	 * Tests the Overflow Flag (V) and branches relatively to PC if V is set. 
	 * This instruction branches relatively to PC in either direction (PC - 63 ≤ destination ≤ PC + 64). 
	 * The parameter k is the offset from PC and is represented in two’s complement form. 
	 * (Equivalent to instruction BRBS 3,k)
	 *
	 * @param k
	 */
	brvs: function(k) {

		/** Operation: If V = 1 then PC <- PC + k + 1, else PC <- PC + 1 */
		if (this.sreg[3] === true) {
			this.PC = this.PC + k;
		}

		this.PC++;
	},
	/**
	 * BSET – Bit Set in SREG
	 * 
	 * Sets a single Flag or bit in SREG.
	 * 
	 * @param s
	 */
	bset: function(s) {

		switch (s) {
			case 7:
				this.sreg[7] = true;
				break;
			case 6:
				this.sreg[6] = true;
				break;
			case 5:
				this.sreg[5] = true;
				break;
			case 4:
				this.sreg[4] = true;
				break;
			case 3:
				this.sreg[3] = true;
				break;
			case 2:
				this.sreg[2] = true;
				break;
			case 1:
				this.sreg[1] = true;
				break;
			case 0:
				this.sreg[0] = true;
				break;
		}

		this.PC++;
	},
	/**
	 * BST – Bit Store from Bit in Register to T Flag in SREG
	 * 
	 * Stores bit b from Rd to the T Flag in SREG (Status Register).
	 * 
	 * @param _Rd
	 * @param b
	 */
	bst: function(_Rd, b) {

		this.sreg[6] = _Rd[b];

		this.PC++;
	},
	/**
	 * CLC – Clear Carry Flag
	 * 
	 * Clears the Carry Flag (C) in SREG (Status Register).
	 */
	clc: function() {

		/* Carry Flag cleared */
		this.sreg[0] = false;

		/* Program counter */
		this.PC++;
	},
	/**
	 * CLH – Clear Half Carry Flag 
	 * 
	 * Clears the Half Carry Flag (H) in SREG (Status Register). 
	 */
	clh: function() {

		/* Half Carry Flag cleared */
		this.sreg[5] = false;

		/* Program counter */
		this.PC++;
	},
	/**
	 * CLI – Clear Global Interrupt Flag
	 * 
	 * Clears the Global Interrupt Flag (I) in SREG (Status Register). 
	 * The interrupts will be immediately disabled. 
	 * No interrupt will be executed after the CLI instruction, 
	 * even if it occurs simultaneously with the CLI instruction.
	 */
	cli: function() {

		/* Global Interrupt Flag cleared */
		this.sreg[7] = false;

		/* Program counter */
		this.PC++;
	},
	/**
	 * CLN – Clear Negative Flag 
	 * 
	 * Clears the Negative Flag (N) in SREG (Status Register).
	 */
	cln: function() {

		/* Negative Flag cleared */
		this.sreg[2] = false;

		/* Program counter */
		this.PC++;
	},
	/**
	 * CLR – Clear Register
	 * 
	 * Clears a register. 
	 * This instruction performs an Exclusive OR between a register and itself. 
	 * This will clear all bits in the register.
	 *
	 * @param _Rd    Destination register
	 */
	clr: function(_Rd) {

		var Rd = this.reg[_Rd];

		/* Operation: Rd <- Rd != Rd */
		Rd[0] = Rd[0] !== Rd[0];
		Rd[1] = Rd[1] !== Rd[1];
		Rd[2] = Rd[2] !== Rd[2];
		Rd[3] = Rd[3] !== Rd[3];
		Rd[4] = Rd[4] !== Rd[4];
		Rd[5] = Rd[5] !== Rd[5];
		Rd[6] = Rd[6] !== Rd[6];
		Rd[7] = Rd[7] !== Rd[7];

		this.sreg[4] = false;
		this.sreg[3] = false;
		this.sreg[2] = false;
		this.sreg[1] = true;

		/* Program counter */
		this.PC++;

		this.reg[_Rd] = Rd;
	},
	/**
	 * CLS – Clear Signed Flag
	 * 
	 * Clears the Signed Flag (S) in SREG (Status Register). 
	 */
	cls: function() {

		/* Signed Flag cleared */
		this.sreg[4] = false;

		/* Program counter */
		this.PC++;
	},
	/**
	 * CLT – Clear T Flag
	 * 
	 * Clears the T Flag in SREG (Status Register).
	 */
	clt: function() {

		/* T Flag cleared */
		this.sreg[6] = false;

		this.PC++;
	},
	/**
	 * CLV – Clear Overflow Flag
	 * 
	 * Clears the Overflow Flag (V) in SREG (Status Register).
	 */
	clv: function() {

		/* Overflow Flag cleared */
		this.sreg[3] = false;

		this.PC++;
	},
	/**
	 * CLZ – Clear Zero Flag 
	 * 
	 * Clears the Zero Flag (Z) in SREG (Status Register). 
	 */
	clz: function() {

		/* Zero Flag cleared */
		this.sreg[1] = false;

		this.PC++;
	},
	/**
	 * EOR – Exclusive OR
	 * 
	 * Performs the logical EOR between the contents of register Rd and register Rr
	 * and places the result in the destination register Rd.
	 *
	 * @param _Rd
	 * @param _Rr
	 */
	eor: function(_Rd, _Rr) {

		var Rd = this.reg[_Rd];
		var Rr = this.reg[_Rr];

		/* Operation: Rd <- Rd != Rr */
		Rd[0] = Rd[0] !== Rr[0];
		Rd[1] = Rd[1] !== Rr[1];
		Rd[2] = Rd[2] !== Rr[2];
		Rd[3] = Rd[3] !== Rr[3];
		Rd[4] = Rd[4] !== Rr[4];
		Rd[5] = Rd[5] !== Rr[5];
		Rd[6] = Rd[6] !== Rr[6];
		Rd[7] = Rd[7] !== Rr[7];

		/* @TODO */
		this.sreg[4];
		/* Cleared */
		this.sreg[3] = false;
		/* Set if MSB of the result is set; cleared otherwise. */
		this.sreg[2] = Rd[7];
		/* Set if the result is $00; cleared otherwise. */
		this.sreg[1] = !Rd[7] && !Rd[6] && !Rd[5] && !Rd[4] && !Rd[3] && !Rd[2] && !Rd[1] && !Rd[0];

		/* Program counter */
		this.PC++;

		this.reg[_Rd] = Rd;
	},
	/**
	 * JMP – Jump
	 * 
	 * Jump to an address within the entire 4M (words) Program memory. 
	 * See also RJMP.
	 * 
	 * @param k
	 */
	jmp: function(k) {

		/* @TODO */

		this.PC = k;

	},
	/**
	 * LDI – Load Immediate
	 * 
	 * Loads an 8 bit constant directly to register 16 to 31.
	 * 
	 * @param {type} _Rd
	 * @param {type} K
	 */
	ldi: function(_Rd, K) {

		var Rd = this.reg[_Rd];

		/* Operation Rd <- K */
		Rd[0] = K[0];
		Rd[1] = K[1];
		Rd[2] = K[2];
		Rd[3] = K[3];
		Rd[4] = K[4];
		Rd[5] = K[5];
		Rd[6] = K[6];
		Rd[7] = K[7];

		this.PC++;

		this.reg[_Rd] = Rd;
	},
	/**
	 *  Logical Shift Left
	 *  
	 *  Shifts all bits in Rd one place to the left. 
	 *  Bit 0 is cleared. 
	 *  Bit 7 is loaded into the C Flag of the SREG. 
	 *  This operation effectively multiplies signed and unsigned values by two.
	 *  
	 *  @param _Rd
	 */
	lsl: function(_Rd) {

		var Rd = this.reg[_Rd];

		/* Set if, before the shift, the MSB of Rd was set; cleared otherwise. */
		this.sreg[0] = Rd[7];

		/* Operation */
		Rd[7] = Rd[6];
		Rd[6] = Rd[5];
		Rd[5] = Rd[4];
		Rd[4] = Rd[3];
		Rd[3] = Rd[2];
		Rd[2] = Rd[1];
		Rd[1] = Rd[0];
		Rd[0] = false;

		/* @TODO */
		this.sreg[5] = Rd[3];
		/* For signed tests. */
		this.sreg[4] = !!(this.sreg[2] ^ this.sreg[3]);
		/* For N and C after the shift. */
		this.sreg[3] = !!(this.sreg[2] ^ this.sreg[0]);
		/* Set if MSB of the result is set; cleared otherwise. */
		this.sreg[2] = Rd[7];
		/* Set if the result is $00; cleared otherwise */
		this.sreg[1] = !Rd[7] && !Rd[6] && !Rd[5] && !Rd[4] && !Rd[3] && !Rd[2] && !Rd[1] && !Rd[0];

		/* Program Counter */
		this.PC++;

		this.reg[_Rd] = Rd;
	},
	/**
	 * Logical Shift Right
	 * 
	 * Shifts all bits in Rd one place to the right. 
	 * Bit 7 is cleared. 
	 * Bit 0 is loaded into the C Flag of the SREG. 
	 * This operation effectively divides an unsigned value by two. 
	 * The C Flag can be used to round the result.
	 * 
	 * @param  _Rd
	 */
	lsr: function(_Rd) {

		Rd = this.reg[_Rd];

		/* Set if, before the shift, the LSB of Rd was set; cleared otherwise */
		this.sreg[0] = Rd[0];

		/* Operation */
		Rd[0] = Rd[1];
		Rd[1] = Rd[2];
		Rd[2] = Rd[3];
		Rd[3] = Rd[4];
		Rd[4] = Rd[5];
		Rd[5] = Rd[6];
		Rd[6] = Rd[7];
		Rd[7] = false;

		/* @TODO */
		/* For signed tests. */
		this.sreg[4] = !!(this.sreg[2] ^ this.sreg[3]);
		/* For N and C after the shift. */
		this.sreg[3] = !!(this.sreg[2] ^ this.sreg[0]);
		this.sreg[2] = false;
		/* Set if the result is $00; cleared otherwise */
		this.sreg[1] = !Rd[7] && !Rd[6] && !Rd[5] && !Rd[4] && !Rd[3] && !Rd[2] && !Rd[1] && !Rd[0];

		/* Program Counter */
		this.PC++;

		this.reg[_Rd] = Rd;
	},
	/**
	 * MOV – Copy Registe
	 * 
	 * This instruction makes a copy of one register into another. 
	 * The source register Rr is left unchanged, 
	 * while the destination register Rd is loaded with a copy of Rr.
	 *
	 * @param _Rd
	 * @param _Rr
	 */
	mov: function(_Rd, _Rr) {

		var Rd = this.reg[_Rd];
		var Rr = this.reg[_Rr];

		/* Operation: Rd <- Rr */
		Rd[0] = Rr[0];
		Rd[1] = Rr[1];
		Rd[2] = Rr[2];
		Rd[3] = Rr[3];
		Rd[4] = Rr[4];
		Rd[5] = Rr[5];
		Rd[6] = Rr[6];
		Rd[7] = Rr[7];

		this.PC++;

		this.reg[_Rd] = Rd;
	},
	/**
	 * MOVW – Copy Register Word
	 * 
	 * This instruction makes a copy of one register pair into another register pair. 
	 * The source register pair Rr+1:Rr is left unchanged, 
	 * while the destination register pair Rd+1:Rd is loaded with a copy of Rr + 1:Rr.
	 *
	 * @param _Rd
	 * @param _Rr
	 */
	movw: function(_Rd, _Rr) {

		var Rd = this.reg[_Rd];
		var Rd1 = this.reg[_Rd + 1];
		var Rr = this.reg[_Rr];
		var Rr1 = this.reg[_Rr + 1];

		/* Operation: Rd+1:Rd <- Rr+1:Rr */
		/* @TODO */

		this.PC++;
	},
	/**
	 * NOP – No Operation
	 * 
	 * This instruction performs a single cycle No Operation.
	 */
	nop: function() {

		/* Incrementing program cointer */
		this.PC++;
	},
	/**
	 * OR – Logical OR
	 * 
	 * Performs the logical OR between the contents of register Rd and register Rr 
	 * and places the result in the destination register Rd.
	 *
	 * @param _Rd
	 * @param _Rr
	 */
	or: function(_Rd, _Rr) {

		var Rd = this.reg[_Rd];
		var Rr = this.reg[_Rr];

		/* Operation: Rd <- Rd || Rr */
		Rd[0] = Rd[0] || Rr[0];
		Rd[1] = Rd[1] || Rr[1];
		Rd[2] = Rd[2] || Rr[2];
		Rd[3] = Rd[3] || Rr[3];
		Rd[4] = Rd[4] || Rr[4];
		Rd[5] = Rd[5] || Rr[5];
		Rd[6] = Rd[6] || Rr[6];
		Rd[7] = Rd[7] || Rr[7];

		/* @TODO */
		this.sreg[4];
		/* Cleared */
		this.sreg[3] = false;
		/* Set if MSB of the result is set; cleared otherwise. */
		this.sreg[2] = Rd[7];
		/* Set if the result is $00; cleared otherwise. */
		this.sreg[1] = !Rd[7] && !Rd[6] && !Rd[5] && !Rd[4] && !Rd[3] && !Rd[2] && !Rd[1] && !Rd[0];

		/* Program counter */
		this.PC++;

		this.reg[_Rd] = Rd;
	},
	/**
	 * ORI – Logical OR with Immediate
	 * 
	 * Performs the logical OR between the contents of register Rd and a constant 
	 * and places the result in the destination register Rd.
	 *
	 * @param _Rd
	 * @param K
	 */
	ori: function(_Rd, K) {

		var Rd = this.reg[_Rd];

		/* Operation: Rd <- Rd v K */
		Rd[0] = Rd[0] || K[0];
		Rd[1] = Rd[1] || K[1];
		Rd[2] = Rd[2] || K[2];
		Rd[3] = Rd[3] || K[3];
		Rd[4] = Rd[4] || K[4];
		Rd[5] = Rd[5] || K[5];
		Rd[6] = Rd[6] || K[6];
		Rd[7] = Rd[7] || K[7];

		/* @TODO */
		this.sreg[4];
		/* Cleared */
		this.sreg[3] = false;
		/* Set if MSB of the result is set; cleared otherwise. */
		this.sreg[2] = Rd[7];
		/* Set if the result is $00; cleared otherwise. */
		this.sreg[1] = !Rd[7] && !Rd[6] && !Rd[5] && !Rd[4] && !Rd[3] && !Rd[2] && !Rd[1] && !Rd[0];

		this.PC++;

		this.reg[_Rd] = Rd;
	},
	/**
	 * POP – Pop Register from Stack
	 * 
	 * This instruction loads register Rd with a byte from the STACK. 
	 * The Stack Pointer is pre-incremented by 1 before the POP.
	 *
	 * @param _Rd
	 */
	pop: function(_Rd) {

		this.SP++;

		/* Rd <- STACK */
		this.reg[_Rd] = this.stack[this.SP];
		this.PC++;
	},
	/**
	 * PUSH – Push Register on Stack
	 * 
	 * This instruction stores the contents of register Rr on the STACK. 
	 * The Stack Pointer is post-decremented by 1 after the PUSH.
	 *
	 * @param _Rr
	 */
	push: function(_Rr) {

		/* STACK <- Rr */
		this.stack[this.SP] = this.reg[_Rr];

		this.SP--;

		this.PC++;
	},
	/**
	 * ROL – Rotate Left trough Carry
	 * 
	 * Shifts all bits in Rd one place to the left. 
	 * The C Flag is shifted into bit 0 of Rd. 
	 * Bit 7 is shifted into the C Flag. 
	 * This operation, combined with LSL, effectively multiplies multi-byte signed and unsigned values by two.
	 * 
	 * @param _Rd
	 */
	rol: function(_Rd) {

		var Rd = this.reg[_Rd];

		/* Rd3 */
		this.sreg[5] = Rd[3];
		/* Set if, before the shift, the MSB of Rd was set; cleared otherwise. */
		this.sreg[0] = Rd[7];

		/* Operation: C <- b7 <- ... <- b0 <- C */
		Rd[7] = Rd[6];
		Rd[6] = Rd[5];
		Rd[5] = Rd[4];
		Rd[4] = Rd[3];
		Rd[3] = Rd[2];
		Rd[2] = Rd[1];
		Rd[1] = Rd[0];
		Rd[0] = this.sreg[0];

		/* Set if MSB of the result is set; cleared otherwise. */
		this.sreg[2] = Rd[7];
		/* N ^ C (For N and C after the shift) */
		this.sreg[3] = !!(this.sreg[2] ^ this.sreg[0]);
		/* N ^ V, For signed tests. */
		this.sreg[4] = !!(this.sreg[2] ^ this.sreg[3]);
		/* Set if the result is $00; cleared otherwise. */
		this.sreg[1] = !Rd[0] && !Rd[1] && !Rd[2] && !Rd[3] && !Rd[4] && !Rd[5] && !Rd[6] && !Rd[7];

		/* Program counter: PC <- PC + 1 */
		this.PC++;

		/* Save changes */
		this.reg[_Rd] = Rd;
	},
	/**
	 * ROR – Rotate Right through Carry
	 * 
	 * Shifts all bits in Rd one place to the right. 
	 * The C Flag is shifted into bit 7 of Rd.
	 * Bit 0 is shifted into the C Flag. 
	 * This operation, combined with ASR, effectively divides multi-byte signed values by two. 
	 * Combined with LSR it effectively divides multibyte unsigned values by two. 
	 * The Carry Flag can be used to round the result.
	 * 
	 * @param _Rd
	 */
	ror: function(_Rd) {

		var Rd = this.reg[_Rd];

		/* Rd3 */
		this.sreg[5] = Rd[3];
		/* Set if, before the shift, the MSB of Rd was set; cleared otherwise. */
		this.sreg[0] = Rd[0];

		Rd[0] = Rd[1];
		Rd[1] = Rd[2];
		Rd[2] = Rd[3];
		Rd[3] = Rd[4];
		Rd[4] = Rd[5];
		Rd[5] = Rd[6];
		Rd[6] = Rd[7];
		Rd[7] = this.sreg[0];

		/* Set if MSB of the result is set; cleared otherwise. */
		this.sreg[2] = Rd[7];
		/* N ^ C (For N and C after the shift) */
		this.sreg[3] = !!(this.sreg[2] ^ this.sreg[0]);
		/* N ^ V, For signed tests. */
		this.sreg[4] = !!(this.sreg[2] ^ this.sreg[3]);
		/* Set if the result is $00; cleared otherwise. */
		this.sreg[1] = !Rd[0] && !Rd[1] && !Rd[2] && !Rd[3] && !Rd[4] && !Rd[5] && !Rd[6] && !Rd[7];

		/* Program counter: PC <- PC + 1 */
		this.PC++;

		/* Save changes */
		this.reg[_Rd] = Rd;
	},
	/**
	 * This instruction resets the Watchdog Timer. 
	 * This instruction must be executed within a limited time given by the WD prescaler. 
	 * See the Watchdog Timer hardware specification.
	 */
	wd: function() {
		/* @TODO */

		/* Operation: WD timer restart. */

		this.PC++;
	}
};