<?php

class InternParser {
	public static function run($jsonInput) {

		$input = json_decode($jsonInput);

		// check valid input
		$valid = array(
			'parser' => '',
			'regularExpression' => '',
			'flags' => array(),
			'matchText' => 'bluab'
		);

		foreach ($valid as $key=>$value) {
			if (!isset($input->$key)) {
				self::error($key.' not set', $input);
			} elseif (is_string($value) && !is_string($input->$key) || is_array($value) && !is_array($input->$key)) {
				self::error($key.' has not a correct format', $input);
			}
		}


		$output = $input;
		$output->debug = array();


		// set new values
		$regexp = $input->regularExpression;
		$text = $input->matchText;

		$output->error = false;

		// check flags
		$flags = '';
		$global = false;
		foreach ($input->flags as $flag) {
			switch ($flag) {
				case 'i':
				case 'm':
				case 's':
				case 'x':
				case 'u':
					$flags .= $flag;
					break;

				case 'g':
					$global = true;
					break;
			}
		}

		$escapeRegexp = str_replace('/', '\/', $regexp);
		$fullRegexp = '/'.$escapeRegexp.'/'.$flags;

		$output->matchings = array();
		$output->programming = '';

		if ($global) {

			$output->programming =
				'if (preg_match_all(\''.str_replace("'", "\\'", $fullRegexp).'\', $text, $result)) {'."\n".
				'  print_r($result);'."\n".
				'}'."\n";

			if (@preg_match_all($fullRegexp, $text, $result)) {

				$index = 0;

				for($int = 0; $int < count($result[0]); $int++) {
					$currentText = substr($text, $index);

					$match = (object) array();

					$match->text = $result[0][$int];

					// search for index
					$currentIndex = @strpos($currentText, $match->text);
					$index += $currentIndex;
					$match->index = $index;
					$index += strlen($match->text);

					$sub = array();
					for ($i = 0; $i < count($result); $i++) {
						$sub[] = $result[$i][$int];
					}
					$match->subexpressions = $sub;
					$output->matchings[$int] = $match;
				}
			} else {
				$output->error = self::checkError();
			}
		} else {

			$output->programming =
				'if (preg_match(\''.str_replace("'", "\\'", $fullRegexp).'\', $text, $result)) {'."\n".
				'  print_r($result);'."\n".
				'}'."\n";

			if (@preg_match($fullRegexp, $text, $result)) {
				$output->matchings[0] = (object) array();
				$output->matchings[0]->text = $result[0];
				$output->matchings[0]->subexpressions = $result;
				$output->matchings[0]->index = @strpos($text, $result[0]);
			} else {
				$output->error = self::checkError();
			}
		}

		die(json_encode($output));
	}

	private static function checkError() {
		switch (preg_last_error()) {
			case PREG_INTERNAL_ERROR:
				return PREG_INTERNAL_ERROR.': PREG_INTERNAL_ERROR';
				break;

			case PREG_BACKTRACK_LIMIT_ERROR:
				return PREG_BACKTRACK_LIMIT_ERROR.': PREG_BACKTRACK_LIMIT_ERROR';
				break;

			case PREG_RECURSION_LIMIT_ERROR:
				return PREG_RECURSION_LIMIT_ERROR.': PREG_RECURSION_LIMIT_ERROR';
				break;

			case PREG_BAD_UTF8_ERROR:
				return PREG_BAD_UTF8_ERROR.': PREG_BAD_UTF8_ERROR';
				break;

			case PREG_BAD_UTF8_OFFSET_ERROR:
				return PREG_BAD_UTF8_OFFSET_ERROR.': PREG_BAD_UTF8_OFFSET_ERROR';
				break;
		}
		return false;
	}

	private static function error($text, $input) {
		$input->error = $text;
		die(json_encode($input));
	}
}

