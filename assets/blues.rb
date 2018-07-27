use_synth :prophet
use_bpm 113

time = [0.25, 0.5, 0.75, 1]


live_loop :rand do
  4.times do
    play_pattern_timed [ :E2, :Gs2, :B2, :Gs2 ], [0.5], release: 0.5
  end
  
  2.times do
    play_pattern_timed [ :A2, :Cs3, :E3, :Cs3 ], [0.5], release: 0.5
  end
  
  2.times do
    play_pattern_timed [ :E2, :Gs2, :B2, :Gs2 ], [0.5], release: 0.5
  end
  
  play_pattern_timed [ :B2, :Ds3, :Fs3, :Ds3 ], [0.5], release: 0.5
  
  play_pattern_timed [ :A2, :Cs3, :E3, :Cs3 ], [0.5], release: 0.5
  
  2.times do
    play_pattern_timed [ :E2, :Gs2, :B2, :Gs2 ], [0.5], release: 0.5
  end
end
live_loop :drum do
  with_fx :compressor do
    
    sample :drum_heavy_kick, release: 0.5
    sample :drum_cymbal_soft, release: 0.5, amp: 0.6
    sleep 0.5
    sample :drum_cymbal_soft, release: 0.5, amp: 0.4
    sleep 0.5
    sample :drum_snare_hard, release: 0.5
    sample :drum_cymbal_soft, release: 0.5, amp: 0.4
    sleep 0.5
    sample :drum_cymbal_soft, release: 0.5, amp: 0.4
    sleep 0.5
    sample :drum_heavy_kick, release: 0.5
    sample :drum_cymbal_soft, release: 0.5, amp: 0.4
    sleep 0.5
    sample :drum_cymbal_soft, release: 0.5, amp: 0.4
    sample :drum_heavy_kick, release: 0.5
    sleep 0.5
    sample :drum_snare_hard, release: 0.5
    sample :drum_cymbal_soft, release: 0.5, amp: 0.4
    sleep 0.5
    sample :drum_cymbal_soft, release: 0.5, amp: 0.4
    sleep 0.5
  end
end


live_loop :melody do
  use_synth :piano
  
  8.times do
    play choose(scale( :e4, :minor_pentatonic, num_octaves: 2)), release: 1, amp: 1.3
    sleep 0.25
  end
  
  sleep rrand_i(0,4)
  
  8.times do
    play choose(scale( :e3, :minor_pentatonic, num_octaves: 1)), release: 1, amp: 1.3
    sleep 0.333
  end
  
  sleep rrand_i(0,4)
  
  4.times do
    play choose(scale( :e2, :minor_pentatonic, num_octaves: 1)), release: 1, amp: 1.3
    sleep 0.5
  end
  
  sleep rrand_i(0,4)
  
  6.times do
    play choose(scale( :e3, :minor_pentatonic, num_octaves: 1)), release: 1, amp: 1.3
    sleep 0.333
  end
  
  sleep rrand_i(0,4)
  
  3.times do
    play choose(scale( :e4, :minor_pentatonic, num_octaves: 2)), release: 1, amp: 1.3
    sleep 0.25
  end
  
  sleep rrand_i(0,4)
  
  
  
end


