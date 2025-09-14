use starknet::ContractAddress;

pub fn strk_address() -> ContractAddress {
    0x04718f5a0Fc34cC1AF16A1cdee98fFB20C31f5cD61D6Ab07201858f4287c938D.try_into().unwrap()
}

pub fn strk_to_fri(mut amount: u256) -> u256{
    const decimals: u8 = 18;
    let mut i: u8 = 0;
    while i != decimals {
        amount = amount * 10;
        i = i + 1;
    }
    amount
}

#[cfg(test)]
mod tests {
    use super::strk_to_fri;

    #[test]
    fn test_strk_to_fri() {
        let amount = 10;
        let expected = 10000000000000000000;
        assert(strk_to_fri(amount) == expected, 'Conversion failed');
    }
}