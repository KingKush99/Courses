from qiskit import QuantumCircuit, Aer, execute

def qrng(bits=16):
    out=''
    for _ in range(bits):
        qc=QuantumCircuit(1,1)
        qc.h(0); qc.measure(0,0)
        result=execute(qc, Aer.get_backend('qasm_simulator'), shots=1).result()
        out += list(result.get_counts().keys())[0]
    return out

if __name__ == '__main__':
    print('Random bits:', qrng(32))
