use starknet::ContractAddress;

pub fn strk_address() -> ContractAddress {
    0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7.try_into().unwrap()
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