function click_all(i) {
	if (i < 51) {
			$(".add-deal").click();
			setTimeout(click_all(i+1), 5000);
		}
	}

click_all(0);



while ($(".add-deal")) {$(".add-deal").click();}