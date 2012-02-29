use strict;
use warnings;

my ($sec,$min,$hour,$mday,$mon,$year,$wday,$yday,$isdst) = localtime(time);
my @abbr = qw( Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec );
												
my $TagName = ( $year + 1900 ) . "_" . $abbr[$mon] . "_" . $mday . "_Auto";

`hg tag -m "Auto tagging for release" $TagName`;
`hg push`